const express = require('express');
const { v4: uuidv4 } = require('uuid');
const qrcode = require('qrcode');
const Patient = require('../models/Patient');
const { encryptJSON, decryptJSON } = require('../utils/crypto');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();

// Register patient (open)
router.post('/register', async (req, res) => {
  try {
    const { name, dob, aadhaar, idNumber, medicalData, emergencyFields } = req.body;
    const qrToken = uuidv4().split('-')[0] + Date.now().toString(36).slice(-5);
    const encrypted = encryptJSON(medicalData || {});
    const patient = new Patient({
      name, dob, aadhaar, idNumber, qrToken, encryptedMedicalData: encrypted, emergencyFields
    });
    await patient.save();
    const qrPayload = { qrToken };
    const qrDataUrl = await qrcode.toDataURL(JSON.stringify(qrPayload));
    res.json({
      message: 'Patient registered',
      patient: { id: patient._id, name: patient.name, qrToken: patient.qrToken },
      qrImage: qrDataUrl
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Full patient record - only doctors
router.get('/:id/full', authMiddleware, requireRole('doctor'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Not found' });
    const decrypted = decryptJSON(patient.encryptedMedicalData);
    res.json({
      id: patient._id,
      name: patient.name,
      dob: patient.dob,
      idNumber: patient.idNumber,
      emergencyFields: patient.emergencyFields,
      medicalData: decrypted
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update patient - doctors
router.put('/:id', authMiddleware, requireRole('doctor'), async (req, res) => {
  try {
    const { medicalData, emergencyFields } = req.body;
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Not found' });
    if (medicalData) patient.encryptedMedicalData = encryptJSON(medicalData);
    if (emergencyFields) patient.emergencyFields = emergencyFields;
    await patient.save();
    res.json({ message: 'Updated' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;