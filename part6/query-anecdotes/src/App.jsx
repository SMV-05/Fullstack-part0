import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotify } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${updatedAnecdote.content}' voted`)
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div style={{ margin: 20 }}>loading data...</div>
  }

  if (result.isError) {
    return (
      <div style={{ margin: 20, color: 'red' }}>
        anecdote service not available due to problems in server
      </div>
    )
  }

  const anecdotes = result.data

  return (
    <div style={{ fontFamily: 'sans-serif', margin: 20 }}>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      <div style={{ marginTop: 15 }}>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id} style={{ marginBottom: 10 }}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}{' '}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
