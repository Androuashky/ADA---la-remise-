import DepotsCarte from "./DepotsCarte";
import DepotsListe from "./DepotsListe";

function App() {

    return(
        <>
        <DepotsListe/>
        <DepotsCarte/>
        </>
    )
}

export default App
// src/App.jsx — le layout commun + la carte des routes
import { Routes, Route, NavLink } from 'react-router';
import SearchBar from './components/SearchBar';
import Identification from './pages/Identification';
import ListeObjets from './pages/ListeObjets';
import FicheObjet from './pages/FicheObjet';
import DepotListe from './pages/DepotListe';
import FicheDepot from './pages/FicheDepot';
import TableauDeBord from './pages/TableauDeBord';
import styles from './App.module.css';

export default function App() {
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
        </header>
        <main className={styles.content}>
          <Routes>
            <Route index element={<Identification />} />
            <Route path="/tableaudebord" element={<TableauDeBord />} />
            <Route path="/objets" element={<ListeObjets />} />
            <Route path="/objets/:id" element={<FicheObjet />} />
            <Route path="/depots" element={<DepotListe />} />
            <Route path="/depots/:id" element={<FicheDepot />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
