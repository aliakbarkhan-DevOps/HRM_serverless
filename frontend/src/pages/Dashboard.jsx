import React from 'react';
import { Users, UserCheck, Briefcase, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Employees', value: '142', icon: <Users size={24} /> },
    { label: 'Present Today', value: '135', icon: <UserCheck size={24} /> },
    { label: 'Open Jobs', value: '8', icon: <Briefcase size={24} /> },
    { label: 'Payroll Processed', value: '$240k', icon: <DollarSign size={24} /> },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Dashboard Overview</h1>
      
      <div className="dashboard-grid">
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card">
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.label}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card glass">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Recent Activity</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Action</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sarah Connor</td>
                <td>Clocked In</td>
                <td>09:00 AM</td>
                <td><span style={{ color: 'var(--success-color)' }}>Success</span></td>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>Leave Requested</td>
                <td>08:45 AM</td>
                <td><span style={{ color: 'var(--text-secondary)' }}>Pending</span></td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Profile Updated</td>
                <td>08:10 AM</td>
                <td><span style={{ color: 'var(--success-color)' }}>Success</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
