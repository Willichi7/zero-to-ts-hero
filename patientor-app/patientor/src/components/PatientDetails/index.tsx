import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Diagnoses, Patient } from '../../types';
import patientService from '../../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from '../EntryDetails';
import AddEntryModal from '../AddEntryModal';


  const PatientDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);

    useEffect(() => {
     const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getById(String(id));
        console.log(fetchedPatient.entries);
        setPatient(fetchedPatient);
      } catch (e) {
        if (axios.isAxiosError(e)) {
         setError(e.message);
        } else {
         setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
     };

     fetchPatient();
    }, [id]);

    useEffect(() => {
      const fetchDiagnoses = async () => {
       try {
         const fetchedDiagnoses = await patientService.getDiagnose();

         setDiagnoses(fetchedDiagnoses);
       } catch (e) {
         if (axios.isAxiosError(e)) {
          setError(e.message);
         } else {
          setError('An unknown error occurred');
         }
       } finally {
         setLoading(false);
       }
      };
 
      fetchDiagnoses();
     }, [id]);
 
    if (loading) {
     return <CircularProgress />;
    }

    if (error) {
     return <Typography color="error">{error}</Typography>;
    }

    if (!patient) {
     return <Typography>No patient found</Typography>;
    }

    return (
    <Box>
      <Typography variant="h5" component="div" gutterBottom style={{marginTop: '10px'}}>
      <strong>{patient.name}</strong> <FemaleIcon/>
      </Typography>
      <Typography><small>ssn: {patient.ssn}</small></Typography>
      <Typography><small>occupation: {patient.occupation}</small></Typography>
      <AddEntryModal patientId={patient.id} diagnoses={diagnoses}/>
      
      <Typography component="div" gutterBottom style={{ marginTop: '20px' }}>
      <strong>entries</strong>
      {patient.entries.map(entry => (
       <EntryDetails entry={entry} key={entry.id}/>
      ))}
      </Typography>
    </Box>
    );
  };

  export default PatientDetails;