import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './component/login/login'
import Login from './component/login/login';
import './component/admin/admin'
import Admin from './component/admin/admin';
import Register from './component/login/register';
import Customer from './component/customer/customer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<Navigate to ="/login"/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/register' element={<Register/>}/> */}
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/customer' element={<Customer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
