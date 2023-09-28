
import './App.css'
import EncuestaForm from './components/EncuestaForm'
import { Routes ,Route } from 'react-router-dom'
import FormsCompleted from './components/FormsCompleted'
import Footer from './components/Footer'

function App() {


  return (
    <div>
   <h1 className='text-3xl'>Henry form</h1>
   
   <h2 className="text-xl font-extrabold text-gray-700 mb-4">
  By <a href="https://www.linkedin.com/in/agustinnazer" target="_blank" rel="noopener noreferrer" className=" hover:text-indigo-900">Agustin Nazer</a>
</h2>
   <Routes>
      
        <Route path="/" element={ <EncuestaForm /> } />
        <Route path="/encuestas" element={ <FormsCompleted /> } />
       
      </Routes><br></br>
<Footer/>
    </div>
  )
}

export default App
