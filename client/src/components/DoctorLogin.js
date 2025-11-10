import React, { useState } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function DoctorLogin({ onLogin }){
  const [form, setForm] = useState({ email:'', password:'' });
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  async function submit(e){
    e.preventDefault();
    try {
      const resp = await axios.post(${API}/api/auth/login, { email: form.email, password: form.password });
      onLogin(resp.data.token, resp.data.user);
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  }

  return (
    <div>
      <p>Doctor login (create doctor via Postman / register endpoint first)</p>
      <form onSubmit={submit}>
        <label>Email<br/><input name="email" onChange={onChange} required /></label>
        <label>Password<br/><input name="password" type="password" onChange={onChange} required /></label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}