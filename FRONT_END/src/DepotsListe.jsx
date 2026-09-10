import { useState, useEffect } from 'react';
import './DepotsListe.css'

function DepotsListe() {

    const [depots, setDepots] = useState([])
    
    useEffect(()=> {
        async function chargerDepots() {
            const reponse = await fetch("http://localhost:3000/api/depots")
            const donnees = await reponse.json()
            setDepots(donnees)
        }
        chargerDepots()
    }, [])

    return (
    <div className="table-container">

        <table>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE & HEURE</th>
                    <th>TYPE</th>
                    <th>DONATEUR</th>
                    <th>NB OBJETS</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>

            <tbody>

                {depots.map((depot) => (

                    <tr key={depot.id}>

                        <td>
                            #DEP-{String(depot.id).padStart(3, '0')}
                        </td>

                        <td>
                            {depot.date_depot}
                        </td>

                        <td>
                            {depot.type}
                        </td>

                        <td className="donateur">
                            {depot.nom} {depot.prenom}
                        </td>


                        <td>
                            {depot.count} objets
                        </td>

                        <td>
                            <button className="btn-fiche">
                                👁 Voir la fiche
                            </button>
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>
    )
}


export default DepotsListe
