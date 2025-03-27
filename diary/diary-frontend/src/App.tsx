import { useEffect, useState } from "react"
import { Diary } from "./types"
import { createEntries, getAll } from "./services/queries"
import axios from "axios"

const App = () => {
  const [entries , setEntries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [message , setMessage] = useState<string | null>(null)
  
  useEffect(() => {
    getAll()
    .then(data => {
      setEntries(data)
    })
  }, [])

  const addEntries = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const newEntry = {
        date,
        visibility,
        weather,
        comment
      }
      createEntries(newEntry)
        .then(returnedEntry => setEntries(prevEntries => [...prevEntries, returnedEntry])
      )
      setMessage(`Added  a new entry at ${newEntry.date}`)
  
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
      
    }catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.message)
      }else {
        setMessage('An unknown error occurred');
     }
  }
}
  return (
    <div>
      {message}
      <div>
        <h2>Add new entry</h2>
        <form onSubmit={addEntries}>
          <div>
            date <input type="date" value={date} onChange={({ target }) => setDate(target.value)} pattern="\d{4}.\d{2}.\d{2}" placeholder="yyyy.mm.dd" />
          </div>
          <div>
            visibility
            <label htmlFor="great">great</label>
            <input type="radio" name="visibility" value="great" onChange={({ target }) => setVisibility(target.value)} />
            <label htmlFor="good">good</label>
            <input type="radio" name="visibility" value="good" onChange={({ target }) => setVisibility(target.value)} />
            <label htmlFor="ok">ok</label>
            <input type="radio" name="visibility" value="ok" onChange={({ target }) => setVisibility(target.value)} />
            <label htmlFor="poor">poor</label>
            <input type="radio" name="visibility" value="poor" onChange={({ target }) => setVisibility(target.value)} />
          </div>
          <div>
            weather 
            <label htmlFor="sunny">sunny</label>
            <input type="radio" name="weather" value="sunny" onChange={({ target }) => setWeather(target.value)} />
            <label htmlFor="rainy">rainy</label>
            <input type="radio" name="weather" value="rainy" onChange={({ target }) => setWeather(target.value)} />
            <label htmlFor="cloudy">cloudy</label>
            <input type="radio" name="weather" value="cloudy" onChange={({ target }) => setWeather(target.value)} />
            <label htmlFor="stormy">stormy</label>
            <input type="radio" name="weather" value="stormy" onChange={({ target }) => setWeather(target.value)} />
            <label htmlFor="sunny">windy</label>
            <input type="radio" name="weather" value="windy" onChange={({ target }) => setWeather(target.value)} />
          </div>
          <div>
            comment <input value={comment} onChange={({ target }) => setComment(target.value)} />
          </div>
          <button type='submit'>add</button>
        </form>
      </div>

      <h2>Diary entries</h2>
      { entries.map((entry, index) => {
        return (
          <div key={index}>
            <p><strong>{entry.date}</strong></p>
            {entry.visibility} <br />
            {entry.weather}
          </div>
        )
      })}
    </div>
  )
}

export default App