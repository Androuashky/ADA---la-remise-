import { useState, useEffect } from 'react';
import {useNavigate} from "react-router"
import './Liste.css'

function DepotsListe() {
    const navigate = useNavigate()
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
    <>
     <div className="main-container">

            <h2 className="page-title">Gestion des dépôts</h2>

            <p>
                Suivi des dépôts apportés par les donateurs et avancement du tri.
            </p>
    
    <div className="table-container">

        <table>

            <thead>
                <tr>
                    <th><div className="th-filter">ID</div></th>
                    <th><div className="th-filter">DATE & HEURE</div></th>
                    <th><div className="th-filter">TYPE</div></th>
                    <th><div className="th-filter">DONATEUR</div></th>
                    <th><div className="th-filter">NB OBJETS</div></th>
                    <th><div className="th-filter">ACTIONS</div></th>
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

                        <td>
                            {depot.nom} {depot.prenom}
                        </td>


                        <td>
                            <b>{depot.count} objets</b>
                        </td>

                        <td>
                            <button className="btn-vignette"
                            onClick={() => navigate(`/depots/${depot.id}`)}>
                                Voir la fiche
                            </button>
                        </td>

                    </tr>

                ))}

            </tbody>

            <tfoot>
                <tr>
                    <td colSpan={6}>
                        {depots.length} {depots.length > 1 ? 'dépôts trouvés' : 'dépôt trouvé'}
                    </td>
                </tr>
            </tfoot>

        </table>

        </div>
    </div>
    </>
    )
}


export default DepotsListe
