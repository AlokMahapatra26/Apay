import { Routes , Route } from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import {SendMoney} from "./components/SendMoney"
import MoneyDeposite from './components/MoneyDeposite'
import UserInfo from './components/UserInfo'
import Landing from './pages/Landing'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Landing/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          {/* Protected Routes */}
          <Route
           path="/dashboard" 
           element={
           <ProtectedRoute>
              <Dashboard/>
           </ProtectedRoute>} 
           />

          <Route 
            path='/send'
            element={
            <ProtectedRoute>
              <SendMoney/>
            </ProtectedRoute>} 
            />


          <Route 
            path='/deposite' 
            element={
              <ProtectedRoute>
                <MoneyDeposite/>
              </ProtectedRoute>} 
            />


          <Route 
            path="user-info"
            element={
              <ProtectedRoute>
                <UserInfo/>
              </ProtectedRoute>
            } />


          <Route 
            path='/admin-panel'
            element={
              <ProtectedRoute>
                <AdminPanel/>
              </ProtectedRoute>
            } 
            />
        </Routes>
     
    </>
  )
}

export default App
