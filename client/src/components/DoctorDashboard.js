import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function DoctorDashboard({ token, user, onLogout }){
  const [patientId, setPatientId] = useState('');
  const [record, setRecord] = useState(null);

  async function fetchFull(){
    if (!patientId) return alert('Enter patient id');
    try {
      const resp = await axios.get(${API}/api/patients/${patientId}/full, {
        headers: { Authorization: Bearer ${token} }
      });
      setRecord(resp.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching record');
    }
  }

  return (
    <div>
      <p>Logged in as <b>{user?.name || user?.email}</b></p>
      <button onClick={onLogout}>Logout</button>

      <div style={{ marginTop: 10 }}>
        <label>Patient ID (paste):<br/>
          <input value={patientId} onChange={e => setPatientId(e.target.value)} />
        </label>
        <button onClick={fetchFull}>Fetch Full Record</button>
      </div>

      {record && (
        <div style={{ marginTop: 10 }}>
          <h3>Full Patient Record</h3>
          <p><b>Name:</b> {record.name}</p>
          <p><b>DOB:</b> {record.dob ? new Date(record.dob).toLocaleDateString() : 'N/A'}</p>
          <p><b>ID Number:</b> {record.idNumber}</p>
          <h4>Emergency Fields</h4>
          <p>{JSON.stringify(record.emergencyFields)}</p>
          <h4>Medical Data (decrypted)</h4>
          <pre>{JSON.stringify(record.medicalData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}