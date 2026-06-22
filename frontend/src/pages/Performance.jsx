import React from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';

const Performance = () => {
  const reviews = [
    { employee: 'Sarah Connor', role: 'Developer', score: 4.8, date: '2026-05-15', reviewer: 'Tech Lead' },
    { employee: 'John Doe', role: 'Designer', score: 4.2, date: '2026-05-10', reviewer: 'Design Lead' },
    { employee: 'Jane Smith', role: 'Marketing', score: 4.9, date: '2026-04-20', reviewer: 'CMO' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Performance Reviews</h1>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={18} /> Schedule Review
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>Company Avg Score</h3>
            <p>4.5 / 5.0</p>
          </div>
        </div>
        <div className="card stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <Award size={24} />
          </div>
          <div className="stat-info">
            <h3>Reviews Completed</h3>
            <p>128</p>
          </div>
        </div>
      </div>

      <div className="card glass">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Recent Evaluations</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Score</th>
                <th>Reviewer</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '500' }}>{rev.employee}</td>
                  <td>{rev.role}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={16} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontWeight: '600' }}>{rev.score}</span>
                    </div>
                  </td>
                  <td>{rev.reviewer}</td>
                  <td>{rev.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Performance;
