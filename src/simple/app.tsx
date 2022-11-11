import sum from './sum'

export default function App() {
  return (
    <div className="App">
      <h1>sum is {String(sum(1, 2))}</h1>
    </div>
  )
}
