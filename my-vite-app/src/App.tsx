import './App.css'
import { fileDownload } from './download'

function App() {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh',backgroundColor:'#000'}}>
      <p>Click here to download the file</p>
      <button 
      style={{height:'auto', background:"black", color:'white'}}
      onClick={()=>fileDownload()}>Download</button>
    </div>
  )
}

export default App
