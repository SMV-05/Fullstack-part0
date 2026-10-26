import { CoursePart, assertNever } from '../types'

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  const containerStyle = {
    marginBottom: 12,
  }

  switch (part.kind) {
    case 'basic':
      return (
        <div style={containerStyle}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p style={{ fontStyle: 'italic', margin: '4px 0' }}>
            {part.description}
          </p>
        </div>
      )
    case 'group':
      return (
        <div style={containerStyle}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p style={{ margin: '4px 0' }}>
            project exercises {part.groupProjectCount}
          </p>
        </div>
      )
    case 'background':
      return (
        <div style={containerStyle}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p style={{ fontStyle: 'italic', margin: '4px 0' }}>
            {part.description}
          </p>
          <p style={{ margin: '4px 0' }}>
            submit to {part.backgroundMaterial}
          </p>
        </div>
      )
    case 'special':
      return (
        <div style={containerStyle}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p style={{ fontStyle: 'italic', margin: '4px 0' }}>
            {part.description}
          </p>
          <p style={{ margin: '4px 0' }}>
            required skills: {part.requirements.join(', ')}
          </p>
        </div>
      )
    default:
      return assertNever(part)
  }
}

export default Part
