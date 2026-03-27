
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function smokeTest() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }

  console.log('🔗 Connecting to Gemini...');
  const genAI = new GoogleGenAI({ apiKey });
  
  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hola, di "Conectado" si puedes leerme.' }] }],
      config: {
        maxOutputTokens: 20
      }
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      console.log('✅ SUCCESS!');
      console.log('🤖 Response:', text.trim());
    } else {
      console.error('❌ FAILURE: Empty response');
      console.log('Full response object:', JSON.stringify(response, null, 2));
    }
  } catch (error: any) {
    console.error('❌ ERROR encountered:');
    if (error.status) console.error(`Status: ${error.status}`);
    console.error(error.message || error);
    
    // Check for common issues
    if (error.message?.includes('403')) {
      console.log('\n💡 Tip: 403 usually means API key is invalid or Gemini API is not enabled in Google Cloud Console.');
    } else if (error.message?.includes('404')) {
      console.log('\n💡 Tip: 404 might mean the model "gemini-2.0-flash" is not available in your region/tier.');
    }
  }
}

smokeTest();
