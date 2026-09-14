 import { useEffect } from 'react'

function Donnateur ({setDonnateur}) {

  useEffect(() => {
    async function chargerDonnateur() {
      const reponse = await fetch("http://localhost:3000/api/personnes")
      const donnees = await reponse.json()
      setDonnateur(donnees)
    }
    chargerDonnateur()
  }, [setDonnateur])
  return null
}

export default Donnateur