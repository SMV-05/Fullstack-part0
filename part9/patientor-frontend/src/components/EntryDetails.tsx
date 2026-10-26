import { Entry, Diagnosis } from '../types'

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisName = (code: string): string => {
    const diag = diagnoses.find((d) => d.code === code)
    return diag ? diag.name : ''
  }

  const boxStyle = {
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  }

  const renderSpecifics = () => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <div style={{ marginTop: 8 }}>
            <p style={{ margin: '4px 0', color: '#475569' }}>
              <strong>Discharge ({entry.discharge.date}):</strong>{' '}
              {entry.discharge.criteria}
            </p>
          </div>
        )
      case 'OccupationalHealthcare':
        return (
          <div style={{ marginTop: 8 }}>
            <p style={{ margin: '4px 0', color: '#475569' }}>
              <strong>Employer:</strong> {entry.employerName}
            </p>
            {entry.sickLeave && (
              <p style={{ margin: '4px 0', color: '#475569' }}>
                <strong>Sick leave:</strong> {entry.sickLeave.startDate} to{' '}
                {entry.sickLeave.endDate}
              </p>
            )}
          </div>
        )
      case 'HealthCheck':
        const ratingColors = ['#16a34a', '#ca8a04', '#ea580c', '#dc2626']
        return (
          <div style={{ marginTop: 8 }}>
            <p style={{ margin: '4px 0' }}>
              <strong>Health Rating:</strong>{' '}
              <span
                style={{
                  color: ratingColors[entry.healthCheckRating] || '#000000',
                  fontWeight: 'bold',
                }}
              >
                Rating {entry.healthCheckRating}
              </span>
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={boxStyle}>
      <p style={{ margin: '0 0 6px 0', fontWeight: 'bold' }}>
        {entry.date} <span style={{ color: '#0284c7' }}>({entry.type})</span>
      </p>
      <p style={{ fontStyle: 'italic', margin: '4px 0', color: '#334155' }}>
        {entry.description}
      </p>
      {renderSpecifics()}
      <p style={{ margin: '6px 0 0 0', fontSize: 13, color: '#64748b' }}>
        diagnose by {entry.specialist}
      </p>

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
          {entry.diagnosisCodes.map((code) => (
            <li key={code} style={{ fontSize: 13, color: '#334155' }}>
              <strong>{code}</strong> {getDiagnosisName(code)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EntryDetails
