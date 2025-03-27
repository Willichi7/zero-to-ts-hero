import React from "react";
import { Entry } from "../../types";
import { Box, Typography, Card, CardContent } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  const entryStyle = {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    borderLeft: '5px solid black'
  };


  const getHealthIconColor = (rating: number) => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return 'gray'; // fallback
    }
  };
 

  switch (entry.type) {
    case "Hospital":
      return (
        <Card variant="outlined" style={{ ...entryStyle, borderLeftColor: "red" }}>
          <CardContent>
            <Typography>
              {entry.date} <LocalHospitalIcon />
            </Typography>
            <Typography> {entry.description}</Typography>
            <Typography>diagnose by {entry.specialist}</Typography>
            {entry.healthCheckRating !== undefined && (
            <FavoriteIcon sx={{ color: getHealthIconColor(entry.healthCheckRating) }} />
            )}
          </CardContent>
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" style={{ ...entryStyle, borderLeftColor: "blue" }}>
          <CardContent>
            <Typography >
              {entry.date}<WorkIcon /> 
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>diagnose by {entry.specialist}</Typography>
          </CardContent>
        </Card>
      );

    case "HealthCheck":
      return (
        <Card variant="outlined" style={{ ...entryStyle, borderLeftColor: "green" }}>
          <CardContent>
            <Typography >
              {entry.date}<MedicalServicesIcon /> 
            </Typography>
            <Typography>{entry.description}</Typography>
            {entry.healthCheckRating !== undefined && (
              <FavoriteIcon sx={{ color: getHealthIconColor(entry.healthCheckRating) }} />
            )}
            <Typography>diagnose by {entry.specialist}</Typography>
          </CardContent>
        </Card>
      );

    default:
      return (
        <Box sx={{ padding: '10px', backgroundColor: '#f8d7da', borderLeft: '5px solid red' }}>
          <Typography variant="h6" color="error">Unknown Entry Type</Typography>
        </Box>
      );
  }
};

export default EntryDetails;
