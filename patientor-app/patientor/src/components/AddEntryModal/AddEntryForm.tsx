import { useState, SyntheticEvent, ChangeEvent } from "react";
import {  TextField, Grid, Button } from '@mui/material';
import {  EntryFormValues, Diagnoses } from "../../types";
import EntryDetails from "../EntryDetails";

interface Props {
   onCancel: () => void;
   patientId: string;
   diagnoses: Diagnoses[];
   onSubmit: (values: EntryFormValues) => void;
}


const AddEntryForm = ({ onCancel, onSubmit, patientId, diagnoses }: Props) => {
   const [description, setDescription] = useState('');
   const [date, setDate] = useState('');
   const [specialist, setSpecialist] = useState('');
   const [healthCheckRating, setHealthCheckRating] = useState(0);
   const [diagnosisCodes, setDiagnosisCodes] = useState< string[] | undefined>([]);

   const addEntry = (event: SyntheticEvent) => {
      event.preventDefault();
      onSubmit({
          description,
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes,
          type: "HealthCheck",
          patientId
      });
   };

   return (
      <div>
         <form onSubmit={addEntry}>
            <TextField
               label="Description"
               fullWidth 
               value={description}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
            <TextField
               label="Date"
               placeholder="YYYY-MM-DD"
               fullWidth
               value={date}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            />
            <TextField
               label="Specialist"
               fullWidth
               value={specialist}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setSpecialist(e.target.value)}
            />
            <TextField
               label="Health Check Rating"
             type="number"
               fullWidth
               value={healthCheckRating.toString()}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setHealthCheckRating(Number(e.target.value))}
            />
            <TextField
               label="Diagnosis Codes"
               fullWidth
               value={diagnosisCodes ? diagnosisCodes.join(',') : ''}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setDiagnosisCodes(e.target.value.split(','))}
            />


             <Grid item>
                  <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                  >
                      Cancel
                  </Button>
             </Grid>
             
             
               <Grid item>
                  <Button
                     style={{
                        float: "right",
                     }}
                     type="submit"
                     variant="contained"
                  >
                     Add
                  </Button>
                  </Grid >
         </form> <EntryDetails entry={{ description, date, specialist, healthCheckRating, diagnosisCodes, type: "HealthCheck", id: ('') }} />
      </div>
   );
};

export default AddEntryForm;