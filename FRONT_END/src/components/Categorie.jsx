 import { useState, useEffect } from 'react'

function Categorie ({ setCategorie}) {

  useEffect(() => {
    async function chargerDonnateur() {
      const reponse = await fetch("http://localhost:3000/api/categories")
      const donnees = await reponse.json()
      setCategorie(donnees)
    }
    chargerDonnateur()
  }, [setCategorie])

  return null 
  }

export default Categorie