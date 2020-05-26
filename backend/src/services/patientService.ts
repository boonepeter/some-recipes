/*

import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { Patient, NonSensitivePatient, Entry } from '../types';
import { toNewPatient, toNewEntry } from '../utils';

const patients: Patient[] = patientData;

const getPatients = (): Array<Patient> => {
    return patients;
};


const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ name, dateOfBirth, id, gender, occupation, entries }) => (
        {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries
        }
    ));
};


const findPatient = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    console.log(patient)
    return patient;
};

const addPatient = (object: any): Patient => {
    const newId = uuidv4();
    const patient = toNewPatient(object) as Patient;
    patient.id = newId;
    patients.push(patient);
        return patient; 
    };

const addEntry = (id: string, entry: Entry): Patient | undefined => {
    const index = patients.findIndex(p => p.id === id);
    const patient = patients[index];
    const newEntry = toNewEntry(entry);
    const updated = {
        ...patient,
        entries: patient.entries.concat(newEntry)
    };
    patients[index] = updated;
    return updated;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findPatient,
    addEntry,
};

*/