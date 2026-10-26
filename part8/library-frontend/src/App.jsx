import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(() =>
    localStorage.getItem('library-user-token')
  )
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // Función reutilizable para actualizar la caché de Apollo sin duplicados (Ejercicio 8.25)
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((b) => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  // Suscripción a nuevos libros añadidos (Ejercicios 8.24 - 8.25)
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`)
      updateCacheWith(addedBook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
    notify('logged out successfully')
  }

  return (
    <div style={{ fontFamily: 'sans-serif', margin: 20 }}>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      {errorMessage && (
        <div style={{ color: 'red', marginTop: 10 }}>{errorMessage}</div>
      )}

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />
      <Recommend show={page === 'recommend'} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        notify={notify}
      />
    </div>
  )
}

export default App
