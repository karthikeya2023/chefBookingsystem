import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Footer from '../components/Footer'
import Receipes from '../components/Receipes'
import ChefCTA from '../components/ChefCTA'
import Chefs from '../components/Chefs'
import WhatsAppIcon from '../components/WhatsAppIcon'

function Home() {
  return (
    <>
    <Header/>
    <HeroSection/>
    <Services/>
    <ChefCTA/>
    <Receipes/>
    <Chefs/>
    <WhatsAppIcon/>
    <Footer/>
    </>
  )
}

export default Home