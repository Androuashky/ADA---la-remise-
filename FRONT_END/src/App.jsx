// src/App.jsx — le layout commun + la carte des routes
import { Routes, Route, NavLink } from 'react-router';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Identification from './pages/Identification';
import ListeObjets from './pages/ListeObjets';
import FicheObjet from './pages/FicheObjet';
import DepotListe from './pages/DepotListe';
import FicheDepot from './pages/FicheDepot';
import TableauDeBord from './pages/TableauDeBord';
import FormulaireDepot from './pages/NouveauDepot';
import styles from './App.module.css';
import FormulaireObjet from './pages/NouveauObjet';
import BoutonNvDepot from './components/BoutonNvDepot';

export default function App() {
  const [donnateur, setDonnateur] =  useState([])
  const [categorie, setCategorie] =  useState([])

  return (
    <div className={styles.page}>
      {/* Barre latérale gauche */}
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>AdaRemise 📦</h1>
        <nav className={styles.nav}>
          <NavLink to="/"               className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Accueil</NavLink>
          <NavLink to="/objets"         className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Objets</NavLink>
          <NavLink to="/depots"         className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Dépôts</NavLink>
          <NavLink to="/identification" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Qui es-tu ?</NavLink>
        </nav>
      </aside>

      {/* Colonne de droite : searchbar + page courante */}
      <div className={styles.body}>
        <header className={styles.topbar}>
          <SearchBar />
          <BoutonNvDepot/>
        </header>
        <main className={styles.content}>
          <Routes>
            <Route index element={<Identification />} />
            <Route path="/tableaudebord" element={<TableauDeBord />} />
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
  );
}
