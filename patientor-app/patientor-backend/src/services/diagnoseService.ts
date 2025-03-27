import data from "../../data/diagnoses";
import { Diagnoses } from "../types";

const diagnoses: Diagnoses[] = data;

const getDiagnoses = (): Diagnoses[] => {
   return diagnoses;
};

export default {
   getDiagnoses
};
