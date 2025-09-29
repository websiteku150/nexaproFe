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
import ProtectRoute from './component/login/protectRoute';
import SoftwareEditing from './component/customer/software_editing/software_editing';
import AccountStreaming from './component/customer/streaming/accountStreaming';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<Navigate to ="/login"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>
        <Route path='/admin' element={
          <ProtectRoute role="Admin">
          <Admin/>
          </ProtectRoute>}/>
        <Route path='/customerHome' element={
          <ProtectRoute role="Customer">
          <CustomerHome/>
          </ProtectRoute>}/>
        <Route path='/customerStreaming' element={
          <ProtectRoute role="Customer">
          <Streaming/>
          </ProtectRoute>}/>
        <Route path='/customerSoftwareEditing' element={
          <ProtectRoute role="Customer">
          <SoftwareEditing/>
          </ProtectRoute>}/>
        <Route path='/streamingAccount/:id' element={
          <ProtectRoute role="Customer">
          <AccountStreaming/>
          </ProtectRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
