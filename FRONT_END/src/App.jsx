// src/App.jsx

import { Routes, Route, NavLink, Outlet, useNavigate, Navigate } from "react-router";
import { useState } from "react";

import Benevole from "./pages/Benevole";
import ListeObjets from "./pages/ListeObjets";
import FicheObjet from "./pages/FicheObjet";
import DepotListe from "./pages/DepotListe";
import FicheDepot from "./pages/FicheDepot";
import Dashboard from "./pages/Dashboard";
import FormulaireDepot from "./pages/NouveauDepot";
import FormulaireObjet from "./pages/NouveauObjet";
import BoutonNvDepot from "./composants/BoutonNvDepot";
import { getAvatarFor } from "./utils/avatars";

import "./App.css";

// =====================================================
// LAYOUT
// =====================================================

function Layout({ benevole, setBenevole }) {
    const navigate = useNavigate();

    // Déconnexion
    function handleLogout() {
        // Supprime le bénévole du state
        setBenevole(null);

        // Supprime le bénévole du localStorage
        localStorage.removeItem("benevole");

        // Retour à la page de sélection
        navigate("/benevoles");
    }

    const avatar = benevole
        ? getAvatarFor(benevole.prenom, benevole.nom)
        : null;

    return (
        <div className="page">

            {/* =========================================
                BARRE LATERALE
            ========================================= */}

            <aside className="sidebar">

                {/* LOGO */}
                <div className="sidebar-header">
                    <div className="logo-container">
                        <img  src="../../public/logo-feuille.png"   className="logo-icon-app"></img>

                        <span className="logo-text">
                            AdaRemise
                        </span>
                    </div>
                </div>


            {/* BENEVOLE + DECONNEXION */}
            <div className="sidebar-footer">

                <div className="benevole-info">

                    {/* Avatar */}
                    <div
                        className="benevole-initiales"
                        style={avatar && {
                            backgroundColor: avatar.couleur.fond,
                            color: avatar.couleur.texte,
                        }}
                    >
                        {avatar ? avatar.emoji : (
                            <>{benevole?.prenom?.[0]}{benevole?.nom?.[0]}</>
                        )}
                    </div>

                    {/* Nom + rôle */}
                    <div className="benevole-texte">
                        <span className="benevole-nom">
                            {benevole?.prenom}{" "}
                            {benevole?.nom}
                        </span>

                        <span className="benevole-role">
                            👤 Bénévole
                        </span>
                    </div>

                    {/* Déconnexion */}
                    <button
                        className="logout"
                        onClick={handleLogout}
                        title="Se déconnecter"
                    >
                        🚪
                    </button>

                </div>

            </div>

                {/* NAVIGATION */}
                <nav className="nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "link active" : "link"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/objets"
                        className={({ isActive }) =>
                            isActive ? "link active" : "link"
                        }
                    >
                        Objets
                    </NavLink>

                    <NavLink
                        to="/depots"
                        className={({ isActive }) =>
                            isActive ? "link active" : "link"
                        }
                    >
                        Dépôts
                    </NavLink>
                </nav>

              
            </aside>

            {/* =========================================
                PARTIE DROITE
            ========================================= */}

            <div className="body">

                {/* TOPBAR */}
                <header className="topbar">
                    <BoutonNvDepot />
                </header>

                {/* CONTENU */}
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

// =====================================================
// PROTECTION DES PAGES
// =====================================================

function RouteProtegee({ children }) {
    const sauvegarde = localStorage.getItem("benevole");

    if (!sauvegarde) {
        return (
            <Navigate
                to="/benevoles"
                replace
            />
        );
    }

    return children;
}

// =====================================================
// APP
// =====================================================

export default function App() {
    const [donnateur, setDonnateur] = useState([]);
    const [categorie, setCategorie] = useState([]);

    // Récupération du bénévole après F5
    const [benevole, setBenevole] = useState(() => {
        const sauvegarde = localStorage.getItem("benevole");

        if (sauvegarde) {
            try {
                return JSON.parse(sauvegarde);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération du bénévole :",
                    error
                );

                localStorage.removeItem("benevole");
                return null;
            }
        }

        return null;
    });

    return (
        <Routes>

            {/* =========================================
                PAGE DE SELECTION DU BENEVOLE
            ========================================= */}

            <Route
                path="/benevoles"
                element={
                    <Benevole
                        setBenevole={setBenevole}
                    />
                }
            />

            {/* =========================================
                PAGES AVEC LAYOUT
            ========================================= */}

            <Route
                element={
                    <RouteProtegee>
                        <Layout
                            benevole={benevole}
                            setBenevole={setBenevole}
                        />
                    </RouteProtegee>
                }
            >

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* LISTE OBJETS */}
                <Route
                    path="/objets"
                    element={<ListeObjets />}
                />

                {/* FICHE OBJET */}
                <Route
                    path="/objets/:id"
                    element={<FicheObjet />}
                />

                {/* LISTE DEPOTS */}
                <Route
                    path="/depots"
                    element={<DepotListe />}
                />

                {/* FICHE DEPOT */}
                <Route
                    path="/depots/:id"
                    element={
                        <FicheDepot
                            categorie={categorie}
                            setCategorie={setCategorie}
                        />
                    }
                />

                {/* NOUVEAU DEPOT */}
                <Route
                    path="/nvdepots"
                    element={
                        <FormulaireDepot
                            donnateur={donnateur}
                            setDonnateur={setDonnateur}
                        />
                    }
                />

                {/* NOUVEL OBJET */}
                <Route
                    path="/depots/:id/nvobjet"
                    element={
                        <FormulaireObjet
                            categorie={categorie}
                            setCategorie={setCategorie}
                        />
                    }
                />

            </Route>

            {/* =========================================
                ROUTE PAR DEFAUT
            ========================================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/benevoles"
                        replace
                    />
                }
            />

        </Routes>
    );
}