import { GoogleGenAI } from '@google/genai';

export type GeminiStatus = 'online' | 'error_auth' | 'error_quota' | 'error_model' | 'offline';

export interface GeminiResponse {
  content: string;
  status: GeminiStatus;
  errorDetail?: string;
}

export class GeminiClient {
  private genAI: GoogleGenAI;
  private modelName: string;

  constructor(apiKey: string, modelName: string = "gemini-2.0-flash") {
    if (!apiKey) {
      console.warn("⚠️ [GeminiClient] Inicializado sin API Key");
    }
    this.genAI = new GoogleGenAI({ apiKey });
    this.modelName = modelName;
  }

  async generate(prompt: string, contents: any[], systemInstruction: string): Promise<GeminiResponse> {
    try {
      console.log(`🌌 [GeminiClient] Llamando a ${this.modelName}...`);
      console.log(`📝 [GeminiClient] Prompt length: ${prompt.length}, History turns: ${contents.length}`);
      
      const response = await this.genAI.models.generateContent({
        model: this.modelName,
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.65,
          maxOutputTokens: 1200,
        }
      });

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        console.warn("⚠️ [GeminiClient] Respuesta vacía de la API");
        throw new Error("EMPTY_RESPONSE");
      }

      console.log(`✅ [GeminiClient] Éxito desde ${this.modelName} (${text.length} caracteres)`);
      return {
        content: text.trim(),
        status: 'online'
      };

    } catch (error: any) {
      const errorMsg = error.message || String(error);
      console.error(`❌ [GeminiClient] Error detectado:`, errorMsg);

      // Log full error for server-side debugging
      if (error.response) {
        console.error("📄 [GeminiClient] Error Details:", JSON.stringify(error.response, null, 2));
      }

      // Handle specific API errors from @google/genai
      if (errorMsg.includes('401') || errorMsg.includes('403') || errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('expired')) {
        return { 
          content: "", 
          status: 'error_auth', 
          errorDetail: "API Key inválida o expirada. Revisa el archivo .env.local" 
        };
      }

      if (errorMsg.includes('429')) {
        return { 
          content: "", 
          status: 'error_quota', 
          errorDetail: "Límite de cuota excedido (Free Tier). Espera un momento antes de reintentar." 
        };
      }

      if (errorMsg.includes('404')) {
        return { 
          content: "", 
          status: 'error_model', 
          errorDetail: `El modelo ${this.modelName} no fue encontrado. Verifica el ID.` 
        };
      }

      return { 
        content: "", 
        status: 'offline', 
        errorDetail: `Error de conexión: ${errorMsg}` 
      };
    }
  }
}
