import {
  NewPatient,
  Gender,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
} from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (text: unknown, fieldName: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${fieldName}`)
  }
  return text
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown, fieldName: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${String(date)}`)
  }
  return date
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${String(gender)}`)
  }
  return gender
}

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
    }
    return newPatient
  }

  throw new Error('Incorrect data: some fields are missing')
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)
}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || typeof rating !== 'number' || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${String(rating)}`)
  }
  return rating
}

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (!('description' in object) || !('date' in object) || !('specialist' in object) || !('type' in object)) {
    throw new Error('Base entry fields missing')
  }

  const base = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date, 'date'),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(object),
  }

  switch (object.type) {
    case 'HealthCheck':
      if (!('healthCheckRating' in object)) {
        throw new Error('healthCheckRating is required for HealthCheck entry')
      }
      return {
        ...base,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      }
    case 'Hospital':
      if (
        !('discharge' in object) ||
        typeof object.discharge !== 'object' ||
        !object.discharge ||
        !('date' in object.discharge) ||
        !('criteria' in object.discharge)
      ) {
        throw new Error('Discharge date and criteria are required for Hospital entry')
      }
      return {
        ...base,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.discharge.date, 'discharge date'),
          criteria: parseString(object.discharge.criteria, 'discharge criteria'),
        },
      }
    case 'OccupationalHealthcare':
      if (!('employerName' in object)) {
        throw new Error('employerName is required for OccupationalHealthcare entry')
      }
      const occEntry: EntryWithoutId = {
        ...base,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName, 'employerName'),
      }
      if (
        'sickLeave' in object &&
        typeof object.sickLeave === 'object' &&
        object.sickLeave &&
        'startDate' in object.sickLeave &&
        'endDate' in object.sickLeave
      ) {
        occEntry.sickLeave = {
          startDate: parseDate(object.sickLeave.startDate, 'sickLeave startDate'),
          endDate: parseDate(object.sickLeave.endDate, 'sickLeave endDate'),
        }
      }
      return occEntry
    default:
      throw new Error(`Unrecognized entry type: ${String((object as { type: unknown }).type)}`)
  }
}
