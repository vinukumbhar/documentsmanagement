
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDocs from "./AdminDocs"
import ClientDocs from './ClientDocs';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route index  element={<AdminDocs/>}/>
      <Route path='/clients' element={<ClientDocs/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App