import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

async function listModels() {
  console.log("🔍 Listando modelos disponibles...");

  let apiKey = "";
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {
    console.error("❌ No se pudo leer .env.local");
    process.exit(1);
  }

  const genAI = new GoogleGenAI({ apiKey });

  try {
    const response = await genAI.models.list();
    if (response && response.models) {
      console.log("✅ Modelos disponibles:");
      response.models.forEach(m => console.log(`- ${m.name}`));
    } else {
      console.log("⚠️ No se encontraron modelos en la respuesta:", response);
    }
  } catch (error) {
    console.error("❌ ERROR AL LISTAR MODELOS:");
    console.error(error.message || error);
  }
}

listModels();
