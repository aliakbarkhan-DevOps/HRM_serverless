import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const Attendance = () => {
  const records = [
    { date: '2026-06-22', in: '09:00 AM', out: '--:--', status: 'Present', type: 'in' },
    { date: '2026-06-21', in: '08:55 AM', out: '05:05 PM', status: 'Present', type: 'completed' },
    { date: '2026-06-20', in: '09:15 AM', out: '05:30 PM', status: 'Late', type: 'completed' },
    { date: '2026-06-19', in: '--:--', out: '--:--', status: 'Absent', type: 'absent' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Attendance Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={18} /> Clock In
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
            <XCircle size={18} /> Clock Out
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h3>Days Present</h3>
            <p>18</p>
          </div>
        </div>
        <div className="card stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>Late Arrivals</h3>
            <p>2</p>
          </div>
        </div>
      </div>

      <div className="card glass">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Recent Attendance Records</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => (
                <tr key={i}>
                  <td>{record.date}</td>
                  <td>{record.in}</td>
                  <td>{record.out}</td>
                  <td>
                    <span style={{ 
                      color: record.type === 'in' || record.type === 'completed' ? 'var(--success-color)' : 
                             record.type === 'absent' ? 'var(--danger-color)' : '#f59e0b',
                      padding: '0.25rem 0.5rem',
                      background: record.type === 'in' || record.type === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 
                                  record.type === 'absent' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {record.status}
                    </span>
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

export default Attendance;
