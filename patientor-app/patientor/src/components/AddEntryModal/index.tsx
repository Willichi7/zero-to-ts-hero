import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import { EntryFormValues} from "../../types";
import AddEntryForm from './AddEntryForm';
import { Diagnoses } from '../../types';


interface Props {
   modalOpen: boolean;
   onClose: () => void;
   onSubmit: (values: EntryFormValues) => void;
   error?: string;
   patientId: string;
   diagnoses: Diagnoses[];
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, patientId, diagnoses }: Props) => (
   <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>New Health Check Entry</DialogTitle>
      <Divider />
      <DialogContent>
         {error && <Alert severity="error">{error}</Alert>}
         <AddEntryForm onSubmit={onSubmit} onCancel={onClose} id={patientId} diagnoses={diagnoses} />
      </DialogContent>
   </Dialog>
);

export default AddEntryModal;
