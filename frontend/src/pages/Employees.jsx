import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search } from 'lucide-react';

const Employees = () => {
  const [employees, setEmployees] = useState([
    // Dummy initial data for visualization
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', department: 'Engineering', designation: 'Software Engineer' },
    { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', department: 'HR', designation: 'HR Manager' }
  ]);

  // In a real app, we would fetch from API:
  // useEffect(() => {
  //   axios.get('http://api-gateway-url/employees', {
  //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //   }).then(res => setEmployees(res.data)).catch(err => console.error(err));
  // }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Employees</h1>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add Employee
        </button>
      </div>

      <div className="card glass">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search employees..." style={{ paddingLeft: '2.5rem' }} />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>#{emp.id}</td>
                  <td>{emp.first_name} {emp.last_name}</td>
                  <td>{emp.email}</td>
                  <td><span style={{ padding: '0.25rem 0.75rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)', borderRadius: '999px', fontSize: '0.75rem' }}>{emp.department}</span></td>
                  <td>{emp.designation}</td>
                  <td>
                    <button style={{ background: 'transparent', color: 'var(--primary-color)', fontSize: '0.875rem' }}>View</button>
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

export default Employees;
