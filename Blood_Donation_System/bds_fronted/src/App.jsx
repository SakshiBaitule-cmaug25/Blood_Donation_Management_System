import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar.jsx';
import { Home } from './components/Home.jsx';
import { Contact } from './components/contact.jsx';
import { About } from './components/About.jsx';
import { Login } from './components/login.jsx';
import { Register } from './components/Register.jsx';
import { Dashboard } from './components/Dashboard.jsx';
import { CheckAvailability } from './components/CheckAvailability.jsx';
import Welcome from './components/Welcome.jsx';
import { DonateForm } from './components/DonateForm.jsx';
import { Donate } from './components/Donate.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Gallery} from'./components/Gallery.jsx';
import * as React from 'react';

function AppRoutes() {
  const location = useLocation(); // ✅ must be inside BrowserRouter
  const noNavPages = ['/login', '/register', '/'];
  const hideNavbar = noNavPages.includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideNavbar && <NavigationBar />}
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/searchavailability' element={<CheckAvailability />} />
        <Route path='/donateform' element={<DonateForm />} />
        <Route path='/donate' element={<Donate />} />
        <Route path='/gallery' element={<Gallery/>} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
