import React from 'react';
import { Briefcase, Plus, Calendar, Check, X } from 'lucide-react';

const Leave = () => {
  const requests = [
    { id: 1, type: 'Annual Leave', dates: '2026-07-10 to 2026-07-15', days: 4, status: 'Approved', color: 'var(--success-color)' },
    { id: 2, type: 'Sick Leave', dates: '2026-06-15 to 2026-06-16', days: 2, status: 'Pending', color: '#f59e0b' },
    { id: 3, type: 'Personal Leave', dates: '2026-05-01 to 2026-05-01', days: 1, status: 'Rejected', color: 'var(--danger-color)' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Leave Management</h1>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> New Request
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)' }}>
            <Briefcase size={24} />
          </div>
          <div className="stat-info">
            <h3>Annual Balance</h3>
            <p>14 Days</p>
          </div>
        </div>
        <div className="card stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h3>Sick Balance</h3>
            <p>8 Days</p>
          </div>
        </div>
      </div>

      <div className="card glass">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Leave History & Requests</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.type}</td>
                  <td>{req.dates}</td>
                  <td>{req.days}</td>
                  <td>
                    <span style={{ 
                      color: req.color,
                      padding: '0.25rem 0.5rem',
                      background: `${req.color}1a`, // Add alpha for background
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'Pending' ? (
                       <div style={{ display: 'flex', gap: '0.5rem' }}>
                         <button style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '0.25rem', borderRadius: '4px' }}><Check size={16}/></button>
                         <button style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '0.25rem', borderRadius: '4px' }}><X size={16}/></button>
                       </div>
                    ) : (
                      <span style={{ color: 'var(--text-secondary)' }}>--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;
