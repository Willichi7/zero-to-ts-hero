"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientServices_1 = __importDefault(require("../services/patientServices"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientServices_1.default.getNonSensitivePatient());
});
router.get('/:id', (req, res) => {
    const patient = patientServices_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.newPatientSchema.parse(req.body);
        const addedPatient = patientServices_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).send({ error: error.issues });
        }
        else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});
router.post('/:id/entries', (req, res) => {
    const patient = patientServices_1.default.findById(req.params.id);
    if (patient) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res.send(patientServices_1.default.addEntry(req.body, patient.id));
    }
    res.sendStatus(404);
});
exports.default = router;
