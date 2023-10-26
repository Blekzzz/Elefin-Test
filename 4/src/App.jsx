import { Link } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <h1 className='text-3xl text-center text-black font-bold'>Home Page</h1>
      <button className='btn'>
      <Link to={'/register'}>
        Go to Register Page
      </Link>
      </button>
    </>
  )
}

export default App
