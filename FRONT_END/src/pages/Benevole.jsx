import { useEffect, useState } from "react";
import "./benevole.css";

function Benevole() {
    const [benevoles, setBenevoles] = useState([]);
    const [recherche, setRecherche] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/benevoles")
            .then((response) => response.json())
            .then((data) => {
                setBenevoles(data);
            });
    }, []);

    const benevoleFiltres = benevoles.filter((benevole) =>
        (benevole.prenom + " " + benevole.nom)
            .toLowerCase()
            .includes(recherche.toLowerCase())
    );

    return (
        <div className="benevole-page">

            <div className="benevole-container">

                <div className="logo">
                    <span>A</span>
                    <strong>AdaRemise</strong>
                </div>

                <h1>Bienvenue sur l'application</h1>

                <p className="description">
                    Qui utilise l'application aujourd'hui ? Choisissez votre profil pour continuer.
                </p>

                <input
                    className="search"
                    type="text"
                    placeholder="Rechercher un bénévole..."
                    value={recherche}
                    onChange={(event) => setRecherche(event.target.value)}
                />

                <div className="benevole-list">

                    {benevoleFiltres.map((benevole) => (
                        <div
                            className="benevole-card"
                            key={benevole.nom}
                            onClick={() => console.log("Page suivante")}
                        >
                            <div className="initiales">
                                {benevole.prenom[0]}
                                {benevole.nom[0]}
                            </div>

                            <h2>
                                {benevole.prenom} {benevole.nom}
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