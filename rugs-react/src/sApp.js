import './App.css'
import { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    console.log('render')
    return () => console.log('cleanup')
  }, [])

  return (
    <div className="App"> </div>
  )
}

export default App
