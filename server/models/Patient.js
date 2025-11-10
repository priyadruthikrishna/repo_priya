const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  aadhaar: { type: String },
  idNumber: { type: String, unique: true },
  qrToken: { type: String, index: true, unique: true },
  encryptedMedicalData: { type: String },
  emergencyFields: {
    bloodGroup: String,
    allergies: String,
    emergencyContactName: String,
    emergencyContactPhone: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', PatientSchema);