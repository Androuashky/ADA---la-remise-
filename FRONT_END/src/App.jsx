// src/App.jsx — le layout commun + la carte des routes
import { Routes, Route, NavLink } from 'react-router';
import { useState } from 'react';
import SearchBar from './composants/SearchBar';
import Benevole from './pages/Benevole';
import ListeObjets from './pages/ListeObjets';
import FicheObjet from './pages/FicheObjet';
import DepotListe from './pages/DepotListe';
import FicheDepot from './pages/FicheDepot';
import Dashboard from './pages/Dashboard';
import FormulaireDepot from './pages/NouveauDepot';
import FormulaireObjet from './pages/NouveauObjet';
import BoutonNvDepot from './composants/BoutonNvDepot';
import './App.css';

export default function App() {
  const [donnateur, setDonnateur] =  useState([])
  const [categorie, setCategorie] =  useState([])

  return (
      <div className="page">
      {/* Barre latérale gauche */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">A</div>
            <span className="logo-text">AdaRemise</span>
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/dashboard"  className={({ isActive }) => isActive ? "link active" : "link"}>Dashboard</NavLink>
          <NavLink to="/objets"         className={({ isActive }) => isActive ? "link active" : "link"}>Objets</NavLink>
          <NavLink to="/depots"         className={({ isActive }) => isActive ? "link active" : "link"}>Dépôts</NavLink>
        </nav>
      </aside>
    

      {/* Colonne de droite : searchbar + page courante */}
      <div className="body">
        <header className="topbar">
          <SearchBar />
          <BoutonNvDepot/>
        </header>
        <main className="content">
          <Routes>
            <Route index element={<Benevole />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/objets" element={<ListeObjets />} />
            <Route path="/objets/:id" element={<FicheObjet />} />
            <Route path="/depots" element={<DepotListe />} />
            <Route path="/depots/:id" element={<FicheDepot categorie={categorie} setCategorie={setCategorie}/>} />
            <Route path="/nvdepots" element={<FormulaireDepot donnateur={donnateur} setDonnateur={setDonnateur}/>} />
            <Route path="/depots/:id/nvobjet" element={<FormulaireObjet categorie={categorie} setCategorie={setCategorie} />} />
          </Routes>
        </main>
      </div>
    </div> 

  )}

