import React, { useState } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function RegisterPatient(){
  const [form, setForm] = useState({ name:'', dob:'', aadhaar:'', idNumber:'', bloodGroup:'', allergies:'', emergencyContactName:'', emergencyContactPhone:'' });
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [patientId, setPatientId] = useState(null);

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async e => {
    e.preventDefault();
    try {
      const medicalData = { medications:[], chronicDiseases:[], pastSurgeries:[] };
      const emergencyFields = {
        bloodGroup: form.bloodGroup,
        allergies: form.allergies,
        emergencyContactName: form.emergencyContactName,
        emergencyContactPhone: form.emergencyContactPhone
      };
      const resp = await axios.post(${API}/api/patients/register, {
        name: form.name, dob: form.dob, aadhaar: form.aadhaar, idNumber: form.idNumber, medicalData, emergencyFields
      });
      setPatientId(resp.data.patient.id);
      setQrDataUrl(resp.data.qrImage);
      alert('Registered! QR generated below.');
    } catch (err) {
      console.error(err);
      alert('Error registering patient.');
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label>Name<br/><input name="name" onChange={onChange} required /></label>
        <label>DOB<br/><input name="dob" type="date" onChange={onChange} required /></label>
        <label>Aadhaar<br/><input name="aadhaar" onChange={onChange} /></label>
        <label>ID Number<br/><input name="idNumber" onChange={onChange} required /></label>
        <label>Blood Group<br/><input name="bloodGroup" onChange={onChange} /></label>
        <label>Allergies<br/><input name="allergies" onChange={onChange} /></label>
        <label>Emergency Contact Name<br/><input name="emergencyContactName" onChange={onChange} /></label>
        <label>Emergency Contact Phone<br/><input name="emergencyContactPhone" onChange={onChange} /></label>
        <button type="submit">Register & Generate QR</button>
      </form>

      {qrDataUrl && (
        <div style={{ marginTop: 12 }}>
          <h3>QR Code</h3>
          <img src={qrDataUrl} alt="QR" />
          <p>Patient ID: {patientId}</p>
        </div>
      )}
    </div>
  );
}