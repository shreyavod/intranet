import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './Components/Comman/Login/Login'
import Dashboard from './Components/Comman/DashBoard/DashBoard'
// import UploadAttendance from './Components/Admin/UploadFiles/UploadAttendance'
import AddCompany from './Components/Admin/CompanyManagment/AddCompany'
import ViewCompany from './Components/Admin/CompanyManagment/ViewCompany'
import ViewUsers from './Components/Admin/UserManagement/ViewUsers'
import AddUser from './Components/Admin/UserManagement/AddUser'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/" element={<Dashboard/>} />
      {/* <Route path="/uploadattendance" element={<UploadAttendance/>} /> */}
      <Route path='/addcompany' element={<AddCompany />} />
      <Route path='/viewcompany' element={<ViewCompany />} />
      <Route path='/viewusers' element={<ViewUsers />} />
      <Route path='/adduser' element={<AddUser />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}
