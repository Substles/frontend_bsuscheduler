
import { useState } from 'react';

function Settings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
          setError('New password and confirmation do not match');
          return;
        }
    
        // Here you would typically make an API call to change the password
        // For example:
        // api.changePassword({ currentPassword, newPassword })
        //   .then(response => setSuccess('Password changed successfully'))
        //   .catch(err => setError('Failed to change password'));
    
        // For now, we'll just simulate a successful change
        setSuccess('Password changed successfully');
        setError('');
      };

      const formStyle = {
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#f9f9f9'
      };
      
      const inputStyle = {
        width: '100%',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px'
      };
      
      const buttonStyle = {
        width: '100%',
        padding: '5px 20px',
        border: 'none',
        borderRadius: '2px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer'
      };
      
      
    
      return (
        <div style={formStyle}>
        <h1 className='text-center font-bold'>Change your Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              style={inputStyle}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              style={inputStyle}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              style={inputStyle}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

            <br/>
          <button type="submit" style={buttonStyle}>Change Password</button>
        </form>
      </div>
      );
    }
    

export default Settings;
