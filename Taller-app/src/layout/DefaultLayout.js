import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { Windows } from 'react-bootstrap-icons';

const DefaultLayout = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    try{
      const token = JSON.parse(localStorage.getItem('token'));  
      navigate('/home')
      if(token != null){
      }else{
        navigate('/')
      }
    } catch {
      navigate('/')
    }
  }, []);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
