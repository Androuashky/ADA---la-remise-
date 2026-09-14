import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "./benevole.css";

function Benevole({ setBenevole }) {

    const [benevoles, setBenevoles] = useState([]);
    const [recherche, setRecherche] = useState("");

    const navigate = useNavigate();


    // Récupération des bénévoles depuis l'API
    useEffect(() => {

        fetch("http://localhost:3000/api/benevoles")
            .then((response) => response.json())
            .then((data) => {
                setBenevoles(data);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors du chargement des bénévoles :",
                    error
                );
            });

    }, []);


    // Recherche
    const benevoleFiltres = benevoles.filter((benevole) =>
        (benevole.prenom + " " + benevole.nom)
            .toLowerCase()
            .includes(recherche.toLowerCase())
    );


    // Sélection d'un bénévole
    function handleClicProfil(benevole) {

        // On garde le bénévole dans le state React
        setBenevole(benevole);

        // On le sauvegarde pour qu'il reste après F5
        localStorage.setItem(
            "benevole",
            JSON.stringify(benevole)
        );

        // Direction dashboard
        navigate("/dashboard");
    }


    return (

        <div className="benevole-page">

            <div className="benevole-container">

                <div className="logo">

                    <span>A</span>

                    <strong>
                        AdaRemise
                    </strong>

                </div>


                <h1>
                    Bienvenue à la Remise
                </h1>
                <h2>
                    Rien ne se perd, tout se réinvente !                    
                </h2>


                <p className="description">
                    Qui utilise l'application aujourd'hui ?
                    Choisissez votre profil pour continuer.
                </p>


                <input
                    className="search"
                    type="text"
                    placeholder="Rechercher un bénévole..."
                    value={recherche}
                    onChange={(event) =>
                        setRecherche(event.target.value)
                    }
                />


                <div className="benevole-list">

                    {benevoleFiltres.map((benevole) => (

                        <div
                            className="benevole-card"
                            key={benevole.id}
                            onClick={() =>
                                handleClicProfil(benevole)
                            }
                        >

                            <div className="initiales">

                                {benevole.prenom[0]}
                                {benevole.nom[0]}

                            </div>


                            <h2>
                                {benevole.prenom}{" "}
                                {benevole.nom}
                            </h2>


                            <span className="role">
                                👤 Bénévole
                            </span>

                        </div>

                    ))}

                </div>


                <p className="footer">
                    AdaRemise v1.0 — Logiciel de gestion de ressourcerie
                </p>

            </div>

        </div>

    );
}

export default Benevole;