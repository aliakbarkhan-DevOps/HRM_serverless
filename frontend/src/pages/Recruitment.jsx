import React from 'react';
import { Target, Users, PlusCircle } from 'lucide-react';

const Recruitment = () => {
  const jobs = [
    { title: 'Senior Frontend Engineer', department: 'Engineering', applicants: 45, status: 'Active' },
    { title: 'Product Manager', department: 'Product', applicants: 12, status: 'Active' },
    { title: 'HR Specialist', department: 'Human Resources', applicants: 28, status: 'Closed' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Recruitment Pipeline</h1>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={18} /> Post Job
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card glass">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-info">
            <h3>Open Positions</h3>
            <p>2</p>
          </div>
        </div>
        <div className="card stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Applicants</h3>
            <p>85</p>
          </div>
        </div>
      </div>

      <div className="card glass">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Job Postings</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Applicants</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '500' }}>{job.title}</td>
                  <td>{job.department}</td>
                  <td>{job.applicants}</td>
                  <td>
                    <span style={{ 
                      color: job.status === 'Active' ? 'var(--success-color)' : 'var(--text-secondary)',
                      padding: '0.25rem 0.5rem',
                      background: job.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {job.status}
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

export default Recruitment;
