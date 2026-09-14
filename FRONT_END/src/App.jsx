// src/App.jsx — le layout commun + la carte des routes
import { Routes, Route, NavLink } from 'react-router';
// import SearchBar from './composants/SearchBar';
import Identification from './pages/Identification';
import ListeObjets from './pages/ListeObjets';
import FicheObjet from './pages/FicheObjet';
import DepotListe from './pages/DepotListe';
import FicheDepot from './pages/FicheDepot';
import NouveauDepot from './pages/NouveauDepot';
import TableauDeBord from './pages/TableauDeBord';
import './App.css';

export default function App() {
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
          <p className="gestion-section">Gestion</p>
          <NavLink to="/tableaudebord"  className={({ isActive }) => isActive ? "link active" : "link"}>📊 Tableau de bord</NavLink>
          <NavLink to="/objets"         className={({ isActive }) => isActive ? "link active" : "link"}>📦 Objets</NavLink>
          <NavLink to="/depots"         className={({ isActive }) => isActive ? "link active" : "link"}>🗳️ Dépôts</NavLink>
        </nav>
      </aside>

      {/* Colonne de droite : searchbar + page courante */}
      <div className="body">
        <header className="topbar">
          {/* <SearchBar /> */}
        </header>
        <main className="content">
          <Routes>
            <Route index element={<Identification />} />
            <Route path="/tableaudebord" element={<TableauDeBord />} />
            <Route path="/objets" element={<ListeObjets />} />
            <Route path="/objets/:id" element={<FicheObjet />} />
            <Route path="/depots" element={<DepotListe />} />
            <Route path="/depots/nouveaudepot" element={<NouveauDepot />} />
            <Route path="/depots/:id" element={<FicheDepot />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}