import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

async function testConnection() {
  console.log("🔍 Iniciando prueba de conexión con Gemini...");

  // Intentar leer la API Key de .env.local
  let apiKey = "";
  let modelName = "gemini-1.5-flash"; // Default
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
    const modelMatch = envContent.match(/GEMINI_MODEL=(.*)/);
    if (modelMatch) modelName = modelMatch[1].trim();
  } catch (e) {
    console.error("❌ No se pudo leer .env.local");
    process.exit(1);
  }

  if (!apiKey) {
    console.error("❌ No se encontró GEMINI_API_KEY en .env.local");
    process.exit(1);
  }

  console.log("🔑 API Key detectada (primeros 5 caracteres):", apiKey.substring(0, 5) + "...");
  console.log("🤖 Modelo configurado:", modelName);

  const genAI = new GoogleGenAI({ apiKey });

  try {
    console.log(`📡 Llamando al modelo ${modelName}...`);
    const response = await genAI.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: 'Hola, responde con una sola palabra: "OK" si puedes leerme.' }] }],
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text && text.includes("OK")) {
      console.log("✅ ¡CONEXIÓN EXITOSA! Gemini respondió correctamente.");
      console.log("💬 Respuesta:", text.trim());
    } else {
      console.warn("⚠️ Respuesta inesperada:", text);
    }
  } catch (error) {
    console.error("❌ ERROR EN LA CONEXIÓN:");
    console.error(error.message || error);
    if (error.response) {
      console.error("Detalles:", JSON.stringify(error.response, null, 2));
    }
  }
}

testConnection();
