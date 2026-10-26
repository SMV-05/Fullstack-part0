import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState('all')

  const result = useQuery(ALL_BOOKS, {
    variables: selectedGenre === 'all' ? {} : { genre: selectedGenre },
  })

  // Consulta para obtener todos los géneros disponibles
  const allBooksResult = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading || allBooksResult.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const allBooks = allBooksResult.data.allBooks

  // Extraer géneros únicos
  const genres = Array.from(
    new Set(allBooks.flatMap((b) => b.genres))
  )

  return (
    <div>
      <h2>books</h2>
      {selectedGenre !== 'all' && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botones de géneros (Ejercicio 8.19) */}
      <div style={{ marginTop: 15 }}>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            style={{
              marginRight: 5,
              fontWeight: selectedGenre === g ? 'bold' : 'normal',
            }}
          >
            {g}
          </button>
        ))}
        <button
          onClick={() => setSelectedGenre('all')}
          style={{
            fontWeight: selectedGenre === 'all' ? 'bold' : 'normal',
          }}
        >
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
