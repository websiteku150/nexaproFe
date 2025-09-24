import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './component/login/login'
import Login from './component/login/login';
import './component/admin/admin'
import Admin from './component/admin/admin';
import Register from './component/login/register';
import ChangePassword from './component/login/changePassword';
import CustomerHome from './component/customer/home/CustomerHome';
import Streaming from './component/customer/streaming/streaming';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<Navigate to ="/login"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/customerHome' element={<CustomerHome/>}/>
        <Route path='/customerStreaming' element={<Streaming/>}/>
      </Routes>
    </Router>
  );
}

export default App;
