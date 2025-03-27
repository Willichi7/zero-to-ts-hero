import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface Diagnoses {
   code: string;
   name: string;
   latin?: string;  
};

export enum Gender {
   Male = 'male',
   Female = 'female',
   Other = 'other'
};


export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patients extends NewPatient {
   id: string;
   entries: Entry[]; 
};

export type NonSensitivePatientType = Omit<Patients, 'ssn' | 'entries'>;

interface BaseEntry {
   id: string;
   date: string;
   type: string;
   specialist: string;
   diagnosisCodes?: Array<Diagnoses['code']>;
   description: string;
   
};

export enum HealthCheckRating {
   "Healthy" = 0,
   "LowRisk" = 1,
   "HighRisk" = 2,
   "CriticalRisk" = 3
 };
 
 interface HealthCheckEntry extends BaseEntry {
   type: "HealthCheck";
   healthCheckRating: HealthCheckRating;
 };

interface OccupationalHealthcareEntry extends BaseEntry {
   type: "OccupationalHealthcare";
   employerName: string;
   sickLeave?: {
      startDate: string
      endDate: string
   }
  
};

interface HospitalEntry extends BaseEntry {
   type: "Hospital";
   description: string;
   discharge: {
      date: string;
      criteria: string;
   };
   
};



export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;