import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Dashboard} from './pages/LandingPage/LandingPage'
export default function PageNotFound() {
    const navigate =useNavigate();
  return (
    <div> 
        <h2>404 PageNotFound</h2>
        <button onclick={()=> navigate('Dashboard')}> Dashboard</button>
    </div>
  )
}


