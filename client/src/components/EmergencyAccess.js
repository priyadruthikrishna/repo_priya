import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Html5Qrcode } from 'html5-qrcode';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function EmergencyAccess(){
  const [qrToken, setQrToken] = useState('');
  const [result, setResult] = useState(null);
  const scannerRef = useRef(null);

  async function fetchByToken(token){
    try {
      const resp = await axios.get(${API}/api/emergency/${token});
      setResult(resp.data);
    } catch (err) {
      console.error(err);
      alert('Not found or error');
    }
  }

  async function startScanner(){
    if (scannerRef.current) return;
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;
    try {
      const devices = await Html5Qrcode.getCameras();
      const cameraId = devices && devices.length ? devices[0].id : null;
      await html5QrCode.start(cameraId, { fps: 10, qrbox: 250 },
        qrCodeMessage => {
          try {
            const parsed = JSON.parse(qrCodeMessage);
            const token = parsed.qrToken;
            stopScanner();
            fetchByToken(token);
          } catch {
            stopScanner();
            fetchByToken(qrCodeMessage);
          }
        },
        () => {}
      );
    } catch (err) {
      console.error(err);
      alert('Unable to start camera. Paste token instead.');
    }
  }

  function stopScanner(){
    if (!scannerRef.current) return;
    scannerRef.current.stop().then(() => {
      scannerRef.current.clear();
      scannerRef.current = null;
    }).catch(() => { scannerRef.current = null; });
  }

  return (
    <div>
      <div>
        <button onClick={startScanner}>Start Camera Scanner</button>
        <button onClick={stopScanner}>Stop</button>
      </div>

      <div id="reader" style={{ width: 300, height: 300, marginTop: 10 }}></div>

      <div style={{ marginTop: 10 }}>
        <p>Or paste QR token (or full QR JSON):</p>
        <input value={qrToken} onChange={e => setQrToken(e.target.value)} />
        <button onClick={() => {
          try {
            const parsed = JSON.parse(qrToken);
            if (parsed.qrToken) fetchByToken(parsed.qrToken);
            else fetchByToken(qrToken);
          } catch { fetchByToken(qrToken); }
        }}>Fetch</button>
      </div>

      {result && (
        <div style={{ marginTop: 12 }}>
          <h3>Emergency Data</h3>
          <p><b>Name:</b> {result.name}</p>
          <p><b>DOB:</b> {result.dob ? new Date(result.dob).toLocaleDateString() : 'N/A'}</p>
          <h4>Emergency Fields</h4>
          <p><b>Blood Group:</b> {result.emergencyFields?.bloodGroup}</p>
          <p><b>Allergies:</b> {result.emergencyFields?.allergies}</p>
          <p><b>Contact:</b> {result.emergencyFields?.emergencyContactName} - {result.emergencyFields?.emergencyContactPhone}</p>
        </div>
      )}
    </div>
  );
}