
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

async function smokeTest() {
  let apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Try to read from .env.local manually if not in env
    try {
      const envPath = path.resolve(process.cwd(), '.env.local');
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/GEMINI_API_KEY\s*=\s*(.*)/);
      if (match && match[1]) {
        apiKey = match[1].trim().replace(/['"]/g, '');
        console.log('🔑 Found API Key in .env.local');
      }
    } catch (e) {
      console.error('❌ Could not read .env.local');
    }
  }
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found');
    process.exit(1);
  }

  console.log('🔗 Connecting to Gemini (Model: gemini-2.0-flash)...');
  const genAI = new GoogleGenAI({ apiKey });
  
  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: 'Di "Conectado" si puedes leerme.' }] }],
      config: {
        maxOutputTokens: 20
      }
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      console.log('✅ SUCCESS!');
      console.log('🤖 Response:', text.trim());
    } else {
      console.error('❌ FAILURE: Empty response from Gemini');
      console.log('Full response object:', JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ ERROR encountered:');
    console.error(error.message || error);
  }
}

smokeTest();
