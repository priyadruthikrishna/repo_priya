import React, { useState } from 'react';
import RegisterPatient from './components/RegisterPatient';
import EmergencyAccess from './components/EmergencyAccess';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';

export default function App(){
  const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') || null);
  const [doctorUser, setDoctorUser] = useState(JSON.parse(localStorage.getItem('doctorUser') || 'null'));

  function onLogin(token, user){
    localStorage.setItem('doctorToken', token);
    localStorage.setItem('doctorUser', JSON.stringify(user));
    setDoctorToken(token);
    setDoctorUser(user);
  }
  function onLogout(){
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorUser');
    setDoctorToken(null);
    setDoctorUser(null);
  }

  return (
    <div className="container">
      <h1>Emergency Patient Health Records — Prototype</h1>
      <div className="flex">
        <div className="col card">
          <h2>Register Patient</h2>
          <RegisterPatient />
        </div>

        <div className="col card">
          <h2>Emergency Access</h2>
          <EmergencyAccess />
        </div>

        <div className="col card">
          <h2>Doctor Area</h2>
          {!doctorToken ? (
            <DoctorLogin onLogin={onLogin} />
          ) : (
            <DoctorDashboard token={doctorToken} user={doctorUser} onLogout={onLogout} />
          )}
        </div>
      </div>
    </div>
  );
}