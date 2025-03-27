import { Gender, NewPatient } from "./types";
import {z} from 'zod';


export const newPatientSchema = z.object({
   name: z.string(),
   dateOfBirth: z.string(),
   ssn: z.string(),
   gender: z.nativeEnum(Gender),
   occupation: z.string(),
   entries: z.array(
      z.object({
         type: z.string(),
         date: z.string(),
         description: z.string(),
         specialist: z.string(),
         diagnosisCodes: z.array(z.string()).optional(),
         healthCheckRating: z.number().optional(),
         employerName: z.string().optional(),
         sickLeave: z.object({
            startDate: z.string(),
            endDate: z.string()
         }).optional(),
         discharge: z.object({
            date: z.string(),
            criteria: z.string()
         }).optional()
      })
   )
});

const toNewPatient = (object: unknown) : NewPatient => {
   return newPatientSchema.parse(object);
};

export default toNewPatient;