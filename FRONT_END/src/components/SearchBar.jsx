// src/components/SearchBar.jsx
import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [recherche, setRecherche] = useState('');

  const soumettre = (e) => {
    e.preventDefault();
    // Câblé plus tard : la page fera GET /api/objets?recherche=...
  };

  return (
    <form role="search" onSubmit={soumettre} className={styles.form}>
      <input
        type="search"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        placeholder="Rechercher un objet…"
        className={styles.input}
      />
    </form>
  );
}