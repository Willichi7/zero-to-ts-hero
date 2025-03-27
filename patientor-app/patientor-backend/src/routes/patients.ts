import express from 'express';
import patientServices from '../services/patientServices';
import  { newPatientSchema } from '../utils';
import {z} from 'zod';
const router = express.Router();

router.get('/', (_req, res) => {
   res.send(patientServices.getNonSensitivePatient());
});


router.get('/:id', (req: express.Request<{ id: string }>, res) => {
   const patient = patientServices.findById(req.params.id);
   if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
   try {
      const newPatientEntry = newPatientSchema.parse(req.body);
      const addedPatient = patientServices.addPatient(newPatientEntry);
      res.json(addedPatient);
   } catch (error: unknown) {
     if(error instanceof z.ZodError){
      res.status(400).send({error: error.issues});
     }else {
      res.status(400).send({error: 'unknown error'});
     }
   }
});

router.post('/:id/entries', (req, res) => {
   const patient = patientServices.findById(req.params.id);
   if (patient) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      res.send(patientServices.addEntry(req.body, patient.id));
   }

   res.sendStatus(404);
});

export default router;


