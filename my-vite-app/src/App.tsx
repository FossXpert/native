import './App.css'
import { fileDownload } from './download'

function App() {
  return (
    <>
      <button onClick={()=>fileDownload()}>click here</button>
    </>
  )
}

export default App
