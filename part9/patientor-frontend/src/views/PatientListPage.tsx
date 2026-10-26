import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Patient, PatientFormValues, Gender } from '../types'
import patientService from '../services/patients'

interface Props {
  patients: Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [occupation, setOccupation] = useState('')
  const [ssn, setSsn] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState<Gender>(Gender.Other)
  const [error, setError] = useState<string | null>(null)

  const submitPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const values: PatientFormValues = {
        name,
        occupation,
        ssn,
        dateOfBirth,
        gender,
      }
      const newPatient = await patientService.create(values)
      setPatients(patients.concat(newPatient))
      setShowModal(false)
      setName('')
      setOccupation('')
      setSsn('')
      setDateOfBirth('')
      setError(null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error creating patient')
      }
    }
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  }

  const thStyle = {
    textAlign: 'left' as const,
    padding: '12px 14px',
    backgroundColor: '#f1f5f9',
    borderBottom: '2px solid #e2e8f0',
    color: '#475569',
  }

  const tdStyle = {
    padding: '12px 14px',
    borderBottom: '1px solid #f1f5f9',
  }

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Patient list</h2>

      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Occupation</th>
            <th style={thStyle}>Health rating</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td style={tdStyle}>
                <Link
                  to={`/patients/${patient.id}`}
                  style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                >
                  {patient.name}
                </Link>
              </td>
              <td style={tdStyle}>{patient.gender}</td>
              <td style={tdStyle}>{patient.occupation}</td>
              <td style={tdStyle}>
                {patient.entries.length} entries
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setShowModal(!showModal)}
        style={{
          marginTop: 20,
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          padding: '10px 18px',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        {showModal ? 'Cancel' : 'Add New Patient'}
      </button>

      {showModal && (
        <form
          onSubmit={submitPatient}
          style={{
            marginTop: 20,
            padding: 20,
            border: '1px solid #cbd5e1',
            borderRadius: 8,
            backgroundColor: '#ffffff',
            maxWidth: 400,
          }}
        >
          <h3>Add a new patient</h3>
          <div style={{ marginBottom: 10 }}>
            <label>Name: </label>
            <input
              style={{ width: '100%', padding: 6 }}
              value={name}
              onChange={({ target }) => setName(target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>SSN: </label>
            <input
              style={{ width: '100%', padding: 6 }}
              value={ssn}
              onChange={({ target }) => setSsn(target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Date of Birth: </label>
            <input
              type="date"
              style={{ width: '100%', padding: 6 }}
              value={dateOfBirth}
              onChange={({ target }) => setDateOfBirth(target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Occupation: </label>
            <input
              style={{ width: '100%', padding: 6 }}
              value={occupation}
              onChange={({ target }) => setOccupation(target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Gender: </label>
            <select
              style={{ width: '100%', padding: 6 }}
              value={gender}
              onChange={({ target }) => setGender(target.value as Gender)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default PatientListPage
