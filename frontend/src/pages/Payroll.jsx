import React from 'react';
import { DollarSign, Download, FileText } from 'lucide-react';

const Payroll = () => {
  const payslips = [
    { period: 'May 2026', base: '$5,000', deductions: '$450', net: '$4,550', status: 'Paid' },
    { period: 'April 2026', base: '$5,000', deductions: '$450', net: '$4,550', status: 'Paid' },
    { period: 'March 2026', base: '$5,000', deductions: '$450', net: '$4,550', status: 'Paid' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Payroll Overview</h1>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
          <FileText size={18} /> Tax Documents
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card glass" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))' }}>
          <div className="stat-icon" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3 style={{ color: '#e2e8f0' }}>Next Pay Date</h3>
            <p style={{ color: '#fff' }}>June 30, 2026</p>
          </div>
        </div>
      </div>

      <div className="card glass">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Payslip History</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Base Salary</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((slip, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '500' }}>{slip.period}</td>
                  <td>{slip.base}</td>
                  <td><span style={{ color: 'var(--danger-color)' }}>-{slip.deductions}</span></td>
                  <td style={{ color: 'var(--success-color)', fontWeight: '600' }}>{slip.net}</td>
                  <td>
                    <span style={{ 
                      color: 'var(--success-color)',
                      padding: '0.25rem 0.5rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {slip.status}
                    </span>
                  </td>
                  <td>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', color: 'var(--primary-color)', fontSize: '0.875rem' }}>
                      <Download size={16} /> PDF
                    </button>
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

export default Payroll;
