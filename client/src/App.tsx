import { Routes , Route } from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import {SendMoney} from "./components/SendMoney"
import MoneyDeposite from './components/MoneyDeposite'
import UserInfo from './components/UserInfo'
import Landing from './pages/Landing'

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path='/send' element={<SendMoney/>} />
          <Route path='/deposite' element={<MoneyDeposite/>} />
          <Route path="user-info" element={<UserInfo/>} />
        </Routes>
     
    </>
  )
}

export default App
