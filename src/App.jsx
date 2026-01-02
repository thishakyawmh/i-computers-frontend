import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './components/test'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import { Toaster } from 'react-hot-toast'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgotPasswordPage from './pages/forgotPasswordPage'

// 373323418208-1npdm2o1d4taukdjqh1h4nnrc8tos46l.apps.googleusercontent.com

function App() {
  return (
    <GoogleOAuthProvider clientId="373323418208-1npdm2o1d4taukdjqh1h4nnrc8tos46l.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              background: '#0a0a0a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '12px 16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: 'white',
              },
            },
          }}
        />
        <div className="w-full h-screen bg-primary text-secondary">

          <Routes path='/'>
            <Route path='/test' element={<Test />} />
            <Route path='/*' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/admin/*' element={<AdminPage />} />

          </Routes>

        </div>

      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
