import './App.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Join from './components/join/Join'
import Chat from './components/Chat/Chat'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Join />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='*' element={<NavLink to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
