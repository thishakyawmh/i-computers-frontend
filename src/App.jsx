import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './components/test'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-center' />
      <div className="w-full h-screen bg-primary text-secondary">

        <Routes path='/'>
          <Route path='/test' element={<Test />} />
          <Route path='/*' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App
