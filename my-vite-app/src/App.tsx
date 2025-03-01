import './App.css'
import { fileDownload } from './download'

function App() {
  return (
    <>
      <p>Hello Guys clik here </p>
      <button 
      style={{height:'auto', background:"black", color:'white'}}
      onClick={()=>fileDownload()}>Download</button>
    </>
  )
}

export default App
