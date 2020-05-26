import express from 'express';
import patientService from '../services/patientService'

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('get patients');
  res.send(patientService.getNonSensitivePatients());
});

router.post('/:id/entries', (req, res) => {
  const body = req.body;
  const patient = patientService.addEntry(req.params.id, body);
  console.log(body);
  if (!patient) {
    res.status(400).end('error');
  } else {
    res.json(patient);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatient(req.params.id);
  if (!patient) {
    res.status(404).json({ error: 'patient not found' });
  }
  res.json(patient);
});

router.post('/', (req, res) => {
  console.log('adding patient');
  const newPatient = patientService.addPatient(req.body);
  res.send(newPatient);  
});


export default router;