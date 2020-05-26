/*

import { NewPatient, Gender, Entry, SickLeave, EntryType, HealthCheckRating, Discharge, Diagnosis } from './types';
import { v4 as uuid } from 'uuid'

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};


const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('incorrect or missing date: ' + date);
    }
    return date;
};

const parseString = (text: any): string => {
    if (!text || !isString(text)) {
        throw new Error('invalid parameter');
    }
    return text;
};


const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('invalid parameter gender' + gender);
    }
    return gender;
};

export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        occupation: parseString(object.occupation),
        gender: parseGender(object.gender),
        entries: []
    };
};

const isEntryType = (type: any): type is EntryType => {
    return Object.values(EntryType).includes(type);
}

const parseEntryType = (type: any): EntryType => {
    if (!type || !isString(type) || !isEntryType(type)) {
        throw new Error('invalid entry type');
    }
    return type;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating || !isHealthCheckRating(Number(rating))) {
        throw new Error('invalid health check rating');
    }
    return Number(rating);
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !discharge.date || !discharge.criteria) {
        throw new Error('discharge not valid');
    }
    return {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria)
    };
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> | undefined => {
    if (!codes) {
        return codes;
    }
    return codes.map(c => parseString(c));
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
    if (sickLeave) {
        if (!sickLeave.startDate || !sickLeave.endDate) {
            throw new Error('invalid sick leave');
        }
        return {
            startDate: parseDate(sickLeave.startDate),
            endDate: parseDate(sickLeave.endDate)
        };
    }
    return sickLeave;
};

export const toNewEntry = (object: any): Entry => {
    const type = parseEntryType(object.type);
    const id = uuid();
    switch (type) {
        case EntryType.HealthCheck:
            return {
                id: id,
                type: type,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
                specialist: parseString(object.specialist),
                description: parseString(object.description),
                date: parseDate(object.date),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
            };
        case EntryType.Hospital:
            return {
                id: id,
                type: type,
                specialist: parseString(object.specialist),
                description: parseString(object.description),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                date: parseDate(object.date),
                discharge: parseDischarge(object.discharge)
            };
        case EntryType.OccupationalHealthcare:
            return {
                id: id,
                type: type,
                specialist: parseString(object.specialist),
                description: parseString(object.description),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                date: parseDate(object.date),
                employerName: parseString(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
    }
};
*/