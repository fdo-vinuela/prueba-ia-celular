const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const codigoActual = fs.readFileSync('index.html', 'utf8');
const instruccion = process.env.PROMPT_TEXT + "\n\nEste es mi código actual:\n" + codigoActual + "\n\nReescribe el código aplicando los cambios solicitados. Devuelve SOLO el código HTML completo, sin bloques de markdown, sin comillas extra y sin explicaciones.";

async function trabajar() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: instruccion,
    });
    let nuevoCodigo = response.text.replace(/```html/gi, '').replace(/```/g, '').trim();
    fs.writeFileSync('index.html', nuevoCodigo);
    console.log("¡Archivo reescrito con éxito!");
  } catch (error) {
    console.error("Error de la IA:", error);
    process.exit(1);
  }
}
trabajar();
