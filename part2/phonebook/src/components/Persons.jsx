const Person = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}{' '}
    {handleDelete && (
      <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
    )}
  </p>
)

const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map(person => (
      <Person key={person.id} person={person} handleDelete={handleDelete} />
    ))}
  </div>
)

export default Persons
