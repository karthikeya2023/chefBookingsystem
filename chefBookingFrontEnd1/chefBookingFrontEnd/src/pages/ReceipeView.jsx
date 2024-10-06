import React from 'react'
import Header from '../components/Header'
import ViewReceipe from '../components/ViewReceipe'
import Footer from '../components/Footer'
import WhatsAppIcon from '../components/WhatsAppIcon'

function ReceipeView() {
  return (
    <div>
        <Header />
        <ViewReceipe/>
        <WhatsAppIcon/>
        <Footer/>
    </div>
  )
}

export default ReceipeView