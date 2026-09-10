 import { useState, useEffect } from 'react'

function Donnateur ({donnateur, setDonnateur}) {

  useEffect(() => {
    async function chargerDonnateur() {
      const reponse = await fetch("http://localhost:3000/api/personnes")
      const donnees = await reponse.json()
      setDonnateur(donnees)
    }
    chargerDonnateur()
  }, [setDonnateur])
  }

export default Donnateur