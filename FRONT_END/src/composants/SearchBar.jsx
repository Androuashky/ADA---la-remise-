import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
  const soumettre = (e) => {
    e.preventDefault(); // Évite le rechargement de la page au Submit
  };

  return (
    <form role="search" onSubmit={soumettre} className="form">
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="🔎 Rechercher un objet, une catégorie..."
        className="input"
      />
    </form>
  );
}