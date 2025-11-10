const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

router.get('/:qrToken', async (req, res) => {
  try {
    const qrToken = req.params.qrToken;
    const patient = await Patient.findOne({ qrToken });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({
      name: patient.name,
      dob: patient.dob,
      emergencyFields: patient.emergencyFields
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;