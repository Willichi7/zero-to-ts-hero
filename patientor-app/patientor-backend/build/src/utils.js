"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
    entries: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string(),
        date: zod_1.z.string(),
        description: zod_1.z.string(),
        specialist: zod_1.z.string(),
        diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
        healthCheckRating: zod_1.z.number().optional(),
        employerName: zod_1.z.string().optional(),
        sickLeave: zod_1.z.object({
            startDate: zod_1.z.string(),
            endDate: zod_1.z.string()
        }).optional(),
        discharge: zod_1.z.object({
            date: zod_1.z.string(),
            criteria: zod_1.z.string()
        }).optional()
    }))
});
const toNewPatient = (object) => {
    return exports.newPatientSchema.parse(object);
};
exports.default = toNewPatient;
