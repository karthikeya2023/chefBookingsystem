import React from 'react'
import Header from '../components/Header'
import RecipeList from '../components/RecipeList'
import Footer from '../components/Footer'
import WhatsAppIcon from '../components/WhatsAppIcon'

function RecipeListPage() {
  return (
    <>
    <Header/>
    <RecipeList/>
    <WhatsAppIcon/>
    <Footer/>
    </>
  )
}

export default RecipeListPage