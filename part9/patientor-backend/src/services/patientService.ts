import patientsData from '../data/patients'
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  EntryWithoutId,
} from '../types'

const patients: Patient[] = patientsData

const getPatients = (): Patient[] => {
  return patients
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }))
}

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id)
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: String(Math.floor(Math.random() * 1000000)),
    entries: [],
    ...entry,
  }

  patients.push(newPatient)
  return newPatient
}

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry: Entry = {
    id: String(Math.floor(Math.random() * 1000000)),
    ...entry,
  } as Entry

  patient.entries.push(newEntry)
  return newEntry
}

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient,
  addEntry,
}
