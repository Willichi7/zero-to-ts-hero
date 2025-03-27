"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const id = (0, uuid_1.v1)();
const patients = patients_1.default;
const getPatients = () => {
    return patients;
};
const getNonSensitivePatient = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign(Object.assign({ id: String(id) }, entry), { entries: [] });
    patients.push(newPatient);
    return newPatient;
};
const findById = (id) => {
    const entry = patients.find(p => p.id === id);
    return entry ? Object.assign(Object.assign({}, entry), { entries: entry.entries || [] }) : undefined;
};
const addEntry = (entry, id) => {
    const patient = findById(id);
    if (!patient) {
        throw new Error("Patient not found");
    }
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    addEntry,
    getPatients,
    getNonSensitivePatient,
    addPatient,
    findById
};
