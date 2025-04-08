
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDocs from "./AdminPortal/AdminDocs"
import ClientDocs from './ClientPortal/ClientDocs';
import Test from './Test'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route index  element={<AdminDocs/>}/>
      <Route path='/clients' element={<ClientDocs/>}/>
      <Route path='/test' element={<Test/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App