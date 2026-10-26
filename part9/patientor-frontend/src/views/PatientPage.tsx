import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Patient, Diagnosis } from '../types'
import patientService from '../services/patients'
import EntryDetails from '../components/EntryDetails'
import AddEntryForm from '../components/AddEntryForm'

interface Props {
  diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      patientService
        .getById(id)
        .then((data) => setPatient(data))
        .catch((error) => console.error('Error fetching patient:', error))
    }
  }, [id])

  if (!patient) {
    return <div>loading patient data...</div>
  }

  const handleAddEntrySubmit = async (values: unknown) => {
    try {
      if (id) {
        const addedEntry = await patientService.createEntry(id, values)
        setPatient({
          ...patient,
          entries: patient.entries.concat(addedEntry),
        })
        setShowAddEntry(false)
        setErrorMessage(null)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Unknown error adding entry')
      }
    }
  }

  const genderIcon =
    patient.gender === 'male' ? '♂' : patient.gender === 'female' ? '♀' : '⚧'

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>
        {patient.name} <span style={{ fontSize: 24 }}>{genderIcon}</span>
      </h2>
      <p style={{ margin: '4px 0' }}>ssh: {patient.ssn || 'N/A'}</p>
      <p style={{ margin: '4px 0' }}>occupation: {patient.occupation}</p>

      {errorMessage && (
        <div style={{ color: 'red', margin: '10px 0' }}>{errorMessage}</div>
      )}

      {showAddEntry ? (
        <AddEntryForm
          diagnoses={diagnoses}
          onCancel={() => setShowAddEntry(false)}
          onSubmit={handleAddEntrySubmit}
        />
      ) : (
        <button
          onClick={() => setShowAddEntry(true)}
          style={{
            margin: '15px 0',
            backgroundColor: '#0284c7',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Add New Entry
        </button>
      )}

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No entries found for this patient.</p>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          />
        ))
      )}
    </div>
  )
}

export default PatientPage
