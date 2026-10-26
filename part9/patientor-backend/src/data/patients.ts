import { Patient, Gender, HealthCheckRating } from '../types'

const patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1958-07-09',
    ssn: '090758-101X',
    gender: Gender.Male,
    occupation: 'New york cop',
    entries: [
      {
        id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S03.5', 'J10.1'],
        description:
          'Healing time after gunshot wound was normal. No complications.',
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      },
      {
        id: 'fb910e6e-5f36-4a4e-a19e-3e589882a632',
        date: '2019-10-20',
        specialist: 'MD House',
        type: 'HealthCheck',
        description: 'Yearly control visit. Cholesterol slightly elevated.',
        healthCheckRating: HealthCheckRating.LowRisk,
      },
    ],
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-777A',
    gender: Gender.Male,
    occupation: 'Cop',
    entries: [
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f99f3b',
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'Hyalke',
        diagnosisCodes: ['M51.2'],
        description:
          'Patient reported severe back pain after heavy lifting incident at precinct.',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
    ],
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8890',
    gender: Gender.Male,
    occupation: 'Digital evangelist',
    entries: [],
  },
]

export default patients
