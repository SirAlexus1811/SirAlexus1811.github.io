/**
 * Extrahiert die zwei dominantesten Farben aus einem Image-Objekt.
 * - sampledPixelStep: wie viele Pixel übersprungen werden (größer = schneller, weniger genau)
 * - quantize: reduziert Farben auf grobe Buckets, damit nicht jede kleine Nuance zählt
 */
function getDominantColorsFromImage(img, sampledPixelStep = 4, quantize = 16) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    const data = ctx.getImageData(0, 0, w, h).data;
    const counts = Object.create(null);

    // sample pixels, quantize to reduce unique colors
    for (let y = 0; y < h; y += sampledPixelStep) {
        for (let x = 0; x < w; x += sampledPixelStep) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            if (a === 0) continue; // transparent Pixel ignorieren

            // Quantisierung: runden auf nächstes quantize-Intervall
            const rq = Math.round(r / quantize) * quantize;
            const gq = Math.round(g / quantize) * quantize;
            const bq = Math.round(b / quantize) * quantize;

            const key = `${rq},${gq},${bq}`;
            counts[key] = (counts[key] || 0) + 1;
        }
    }

    // sortiere Farben nach Häufigkeit
    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]) // nur die "r,g,b" keys
        .slice(0, 2); // top 2

    // Falls weniger als 2 Farben vorhanden sind, fallback
    if (sorted.length === 0) return ["rgb(128,128,128)", "rgb(200,200,200)"];
    if (sorted.length === 1) return [`rgb(${sorted[0]})`, "rgb(220,220,220)"];

    return sorted.map(k => `rgb(${k})`);
}

// === Dein Bild (konstant) ===
const bgImageURL = "imgs/Weltall.jpg";

const img = new Image();
img.crossOrigin = "anonymous"; // falls extern, kann's nötig sein
img.src = bgImageURL;

img.onload = () => {
    const [c1, c2] = getDominantColorsFromImage(img, 6, 24); // schnellere Optionen
    // in CSS-Variablen speichern, damit dein CSS sie nutzen kann
    document.documentElement.style.setProperty("--color1", c1);
    document.documentElement.style.setProperty("--color2", c2);

    console.log("Dominant colors:", c1, c2);
};

img.onerror = () => {
    console.error("Hintergrundbild konnte nicht geladen werden:", bgImageURL);
};