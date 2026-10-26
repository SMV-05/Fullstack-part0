const App = ({ store }) => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK',
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  const state = store.getState()

  return (
    <div style={{ fontFamily: 'sans-serif', margin: 20 }}>
      <h2>Unicafe Redux</h2>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div style={{ marginTop: 15 }}>
        <div>good {state.good}</div>
        <div>ok {state.ok}</div>
        <div>bad {state.bad}</div>
      </div>
    </div>
  )
}

export default App
