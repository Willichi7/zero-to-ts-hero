import patientEntries from "../../data/patients";
import { NewPatient, NonSensitivePatientType, Patients } from "../types";
import { v1 as uuid } from 'uuid';
const id = uuid();

const patients: Patients[] = patientEntries;

const getPatients = (): Patients[] => {
   return patients;
};

const getNonSensitivePatient = (): NonSensitivePatientType[] => {
   return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
   }));
};

const addPatient = (entry: NewPatient): Patients => {
   const newPatient = {
      id: String(id),
      ...entry,
      entries: []
   };
   patients.push(newPatient);
   return newPatient;
};


const findById = (id: string): Patients | undefined => {
   const entry = patients.find(p => p.id === id);
   return entry ? { ...entry, entries: entry.entries || [] } : undefined;
};


const addEntry = (entry: NewPatient, id: string): Patients  | undefined => {
   const patient = findById(id);
   if(!patient) {
      throw new Error("Patient not found");
   }
   const newEntry = {
      id: uuid(),
      ...entry
   };
   patient.entries.push(newEntry as never);
   return patient;
};

export default {
   addEntry,
   getPatients,
   getNonSensitivePatient,
   addPatient,
   findById
};
