import React, { useState, useEffect } from 'react';
import { Activity, Server, RefreshCw, CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

const DevOps = () => {
  // Use a configurable base URL so the DevOps UI can hit the Nginx gateway even when deployed elsewhere
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const [services, setServices] = useState([
    { name: 'Auth Service', route: '/auth', status: 'Checking...', lastChecked: null, error: null },
    { name: 'Employee Service', route: '/employees', status: 'Checking...', lastChecked: null, error: null },
    { name: 'Attendance Service', route: '/attendance', status: 'Checking...', lastChecked: null, error: null },
    { name: 'Payroll Service', route: '/payroll', status: 'Checking...', lastChecked: null, error: null },
    { name: 'Leave Service', route: '/leave', status: 'Checking...', lastChecked: null, error: null },
    { name: 'Recruitment Service', route: '/jobs', status: 'Checking...', lastChecked: null, error: null },
    { name: 'Performance Service', route: '/performance', status: 'Checking...', lastChecked: null, error: null },
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkHealth = async () => {
    setIsRefreshing(true);
    const updatedServices = await Promise.all(
      services.map(async (service) => {
        try {
          const startTime = Date.now();
          const response = await fetch(`${baseUrl}${service.route}`, { 
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          const latency = Date.now() - startTime;
          
          if (response.status === 502 || response.status === 504) {
            return { 
              ...service, 
              status: 'Down', 
              lastChecked: new Date().toLocaleTimeString(),
              error: `HTTP ${response.status} Bad Gateway`,
              latency: null
            };
          }
          
          return { 
            ...service, 
            status: 'Healthy', 
            lastChecked: new Date().toLocaleTimeString(),
            error: null,
            latency: `${latency}ms`
          };
        } catch (error) {
          return { 
            ...service, 
            status: 'Down', 
            lastChecked: new Date().toLocaleTimeString(),
            error: 'Network Error',
            latency: null
          };
        }
      })
    );
    setServices(updatedServices);
    setIsRefreshing(false);
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); 
    return () => clearInterval(interval);
  }, []);

  const healthyCount = services.filter(s => s.status === 'Healthy').length;
  const downCount = services.filter(s => s.status === 'Down').length;

  return (
    <div className="app-container" style={{ padding: '2rem', display: 'block', height: '100vh', overflowY: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={24} color="var(--primary-color)" /> DevOps Dashboard
          </h1>
          <button 
            className="btn-primary" 
            onClick={checkHealth}
            disabled={isRefreshing}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isRefreshing ? 0.7 : 1 }}
          >
            <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} /> 
            {isRefreshing ? 'Checking...' : 'Refresh Status'}
          </button>
        </div>

        <style>
          {`
            @keyframes spin {
              100% { transform: rotate(360deg); }
            }
          `}
        </style>

        <div className="dashboard-grid">
          <div className="card stat-card glass" style={{ borderLeft: '4px solid var(--success-color)' }}>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <h3>Healthy Services</h3>
              <p>{healthyCount} / {services.length}</p>
            </div>
          </div>
          <div className="card stat-card glass" style={{ borderLeft: downCount > 0 ? '4px solid var(--danger-color)' : '4px solid transparent' }}>
            <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>
              {downCount > 0 ? <ShieldAlert size={24} /> : <Server size={24} />}
            </div>
            <div className="stat-info">
              <h3>Services Down</h3>
              <p style={{ color: downCount > 0 ? 'var(--danger-color)' : 'inherit' }}>{downCount}</p>
            </div>
          </div>
        </div>

        <div className="card glass">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Microservices Status</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            Targeting API Gateway: {baseUrl}
          </p>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Route Path</th>
                  <th>Status</th>
                  <th>Latency</th>
                  <th>Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: '500' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ 
                          width: '10px', height: '10px', borderRadius: '50%',
                          background: service.status === 'Healthy' ? 'var(--success-color)' : 
                                      service.status === 'Down' ? 'var(--danger-color)' : '#f59e0b',
                          boxShadow: service.status === 'Healthy' ? '0 0 8px var(--success-color)' : 
                                    service.status === 'Down' ? '0 0 8px var(--danger-color)' : 'none'
                        }}></div>
                        {service.name}
                      </div>
                    </td>
                    <td><code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>{service.route}</code></td>
                    <td>
                      <span style={{ 
                        color: service.status === 'Healthy' ? 'var(--success-color)' : 
                              service.status === 'Down' ? 'var(--danger-color)' : '#f59e0b',
                        padding: '0.25rem 0.5rem',
                        background: service.status === 'Healthy' ? 'rgba(16, 185, 129, 0.1)' : 
                                    service.status === 'Down' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        display: 'inline-block'
                      }}>
                        {service.status}
                      </span>
                      {service.error && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--danger-color)', marginTop: '0.25rem' }}>
                          {service.error}
                        </div>
                      )}
                    </td>
                    <td>{service.latency || '--'}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{service.lastChecked || '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOps;
