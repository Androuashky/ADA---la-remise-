// utils/avatars.js — avatar émoticône + couleur, stable par nom

export const EMOJIS = ["🦊", "🌻", "🔭", "🦥", "🌀", "🌊", "🐸", "🦉", "🚲", "🌈", "🍃", "🐢"];

export const COULEURS = [
    { fond: "#CFF3EF", texte: "#0F766E" },
    { fond: "#E3F3DC", texte: "#3F6212" },
    { fond: "#DCEBFA", texte: "#1D4ED8" },
    { fond: "#FFE4E0", texte: "#C2410C" },
    { fond: "#EDE4FA", texte: "#6D28D9" },
    { fond: "#F8EED7", texte: "#92400E" },
];

function hashChaine(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
}

export function getAvatarFor(prenom, nom) {
    const index = hashChaine(`${prenom ?? ""} ${nom ?? ""}`);
    return {
        emoji: EMOJIS[index % EMOJIS.length],
        couleur: COULEURS[index % COULEURS.length],
    };
}