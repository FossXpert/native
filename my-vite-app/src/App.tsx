import './App.css'
import { fileDownload } from './download'

function App() {
  return (
    <>
      <p>Click here to download the file</p>
      <button 
      style={{height:'auto', background:"black", color:'white'}}
      onClick={()=>fileDownload()}>Download</button>
    </>
  )
}

export default App
