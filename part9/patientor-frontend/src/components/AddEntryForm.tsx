import { useState, SyntheticEvent } from 'react'
import { Diagnosis } from '../types'

interface Props {
  onCancel: () => void
  onSubmit: (values: unknown) => void
  diagnoses: Diagnosis[]
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState('0')

  // Hospital
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes,
    }

    if (entryType === 'HealthCheck') {
      onSubmit({
        ...base,
        type: 'HealthCheck',
        healthCheckRating: Number(healthCheckRating),
      })
    } else if (entryType === 'Hospital') {
      onSubmit({
        ...base,
        type: 'Hospital',
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      })
    } else if (entryType === 'OccupationalHealthcare') {
      const entryObj: Record<string, unknown> = {
        ...base,
        type: 'OccupationalHealthcare',
        employerName,
      }
      if (sickLeaveStart && sickLeaveEnd) {
        entryObj.sickLeave = {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        }
      }
      onSubmit(entryObj)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    borderRadius: 6,
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box' as const,
    marginBottom: 10,
  }

  return (
    <div
      style={{
        border: '2px dashed #94a3b8',
        padding: 18,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#f8fafc',
      }}
    >
      <h3>New Entry</h3>

      <div style={{ marginBottom: 12 }}>
        <label>Entry Type: </label>
        <select
          value={entryType}
          onChange={({ target }) =>
            setEntryType(target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')
          }
        >
          <option value="HealthCheck">HealthCheck</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">OccupationalHealthcare</option>
        </select>
      </div>

      <form onSubmit={addEntry}>
        <div>
          <label>Description</label>
          <input
            style={inputStyle}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            style={inputStyle}
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label>Specialist</label>
          <input
            style={inputStyle}
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>

        <div>
          <label>Diagnosis Codes (Ctrl+Click to select multiple)</label>
          <select
            multiple
            style={{ ...inputStyle, height: 90 }}
            value={diagnosisCodes}
            onChange={({ target }) => {
              const selected = Array.from(
                target.selectedOptions,
                (option) => option.value
              )
              setDiagnosisCodes(selected)
            }}
          >
            {diagnoses.map((d) => (
              <option key={d.code} value={d.code}>
                {d.code} - {d.name}
              </option>
            ))}
          </select>
        </div>

        {entryType === 'HealthCheck' && (
          <div>
            <label>Healthcheck rating (0 = Healthy, 3 = Critical)</label>
            <select
              style={inputStyle}
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            >
              <option value="0">0 - Healthy</option>
              <option value="1">1 - LowRisk</option>
              <option value="2">2 - HighRisk</option>
              <option value="3">3 - CriticalRisk</option>
            </select>
          </div>
        )}

        {entryType === 'Hospital' && (
          <>
            <div>
              <label>Discharge Date</label>
              <input
                style={inputStyle}
                type="date"
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
            </div>
            <div>
              <label>Discharge Criteria</label>
              <input
                style={inputStyle}
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </div>
          </>
        )}

        {entryType === 'OccupationalHealthcare' && (
          <>
            <div>
              <label>Employer Name</label>
              <input
                style={inputStyle}
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </div>
            <div>
              <label>Sick Leave Start</label>
              <input
                style={inputStyle}
                type="date"
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
              />
            </div>
            <div>
              <label>Sick Leave End</label>
              <input
                style={inputStyle}
                type="date"
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
              />
            </div>
          </>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
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
            Add Entry
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEntryForm
