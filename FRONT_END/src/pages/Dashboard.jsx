import { useEffect, useState } from "react";
import { Link } from "react-router";
import StatutBadge from "../composants/StatutBadge";
import "../composants/Fiche.css";
import "./Dashboard.css";

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3000/api/stats/par-statut").then((response) => response.json()),
            fetch("http://localhost:3000/api/stats/poids-total").then((response) => response.json()),
            fetch("http://localhost:3000/api/stats/en-rayon").then((response) => response.json())
        ])
            .then(([objetsParStatut, poidsTotal, objetsEnRayon]) => {
                setStats({
                    objets_par_statut: objetsParStatut,
                    poids_total_recu_kg: poidsTotal.poids_total_recu_kg,
                    nombre_objets_en_rayon: objetsEnRayon.objets_en_rayon
                });
            });
    }, []);

    const totalObjets = (stats?.objets_par_statut ?? [])
        .reduce((total, statut) => total + statut.nombre_objets, 0);

    return (
        <div className="main-container">
            <h1 className="page-title">Dashboard</h1>
            <p>Vue d'ensemble de l'activité de la ressourcerie.</p>

            <div className="stats-cards">

                <div className="card stat-card">
                    <span className="info-label">OBJETS EN RAYON</span>
                    <strong className="stat-value">
                        {stats?.nombre_objets_en_rayon}
                    </strong>
                    <span className="stat-icon">📦</span>
                </div>

                <div className="card stat-card">
                    <span className="info-label">POIDS TOTAL REÇU</span>
                    <strong className="stat-value">
                        {stats?.poids_total_recu_kg} kg
                    </strong>
                    <span className="stat-icon">⚖️</span>
                </div>

                <div className="card stat-card">
                    <span className="info-label">TOTAL D'OBJETS</span>
                    <strong className="stat-value">
                        {totalObjets}
                    </strong>
                    <span className="stat-icon">✓</span>
                </div>

            </div>

            <section className="card">
                <h3>Objets par statut</h3>

                <div className="status-list">

                    {stats?.objets_par_statut.map((statut) => (
                        <div
                            className="status-card"
                            key={statut.statut}
                        >
                            <StatutBadge statut={statut.statut} />
                            <strong className="stat-value">{statut.nombre_objets}</strong>
                        </div>
                    ))}

                </div>
            </section>

            <section className="consultation-section">

                <h2 className="section-title">Que voulez-vous consulter ?</h2>

                <div className="consultation-list">

                    <Link to="/objets" className="card consultation-card">

                        <div className="consultation-top">

                            <div className="consultation-title">
                                <span>📦</span>
                                <h3>Gestion des objets</h3>
                            </div>

                            <span className="consultation-arrow">→</span>

                        </div>

                        <p>
                            Consultez l'inventaire,
                            changez les statuts (en rayon, vendu,
                            recyclé) et filtrez par catégorie.
                        </p>

                    </Link>

                    <Link to="/depots" className="card consultation-card">

                        <div className="consultation-top">

                            <div className="consultation-title">
                                <span>🏠</span>
                                <h3>Gestion des dépôts</h3>
                            </div>

                            <span className="consultation-arrow">→</span>

                        </div>

                        <p>
                            Suivez les lots apportés par les donateurs,
                            créez de nouveaux de dépôt.
                        </p>

                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;