import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Patient, Diagnosis } from './types'
import patientService from './services/patients'
import diagnosisService from './services/diagnoses'
import PatientListPage from './views/PatientListPage'
import PatientPage from './views/PatientPage'

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    patientService.getAll().then((data) => setPatients(data))
    diagnosisService.getAll().then((data) => setDiagnoses(data))
  }, [])

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    padding: '12px 20px',
    backgroundColor: '#0284c7',
    borderRadius: 8,
    marginBottom: 20,
  }

  return (
    <div style={{ maxWidth: 850, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <Router>
        <div style={navStyle}>
          <h2 style={{ color: 'white', margin: 0, marginRight: 20 }}>Patientor</h2>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 600,
              backgroundColor: '#0369a1',
              padding: '6px 12px',
              borderRadius: 4,
            }}
          >
            Home
          </Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage
                patients={patients}
                setPatients={setPatients}
              />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientPage diagnoses={diagnoses} />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
