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
    this.genAI = new GoogleGenAI({ apiKey });
    this.modelName = modelName;
  }

  async generate(prompt: string, contents: any[], systemInstruction: string): Promise<GeminiResponse> {
    try {
      console.log(`🌌 [GeminiClient] Calling ${this.modelName}...`);
      
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
        throw new Error("EMPTY_RESPONSE");
      }

      console.log(`✅ [GeminiClient] Success from ${this.modelName}`);
      return {
        content: text.trim(),
        status: 'online'
      };

    } catch (error: any) {
      const errorMsg = error.message || String(error);
      console.error(`❌ [GeminiClient] Error:`, errorMsg);

      // Handle specific API errors from @google/genai
      if (errorMsg.includes('401') || errorMsg.includes('403') || errorMsg.includes('expired')) {
        return { 
          content: "", 
          status: 'error_auth', 
          errorDetail: "API Key inválida o expirada. Por favor actualiza .env.local" 
        };
      }

      if (errorMsg.includes('429')) {
        return { 
          content: "", 
          status: 'error_quota', 
          errorDetail: "Límite de cuota excedido (Free Tier). Intenta de nuevo en un minuto." 
        };
      }

      if (errorMsg.includes('404')) {
        return { 
          content: "", 
          status: 'error_model', 
          errorDetail: `El modelo ${this.modelName} no está disponible o el ID es incorrecto.` 
        };
      }

      return { 
        content: "", 
        status: 'offline', 
        errorDetail: errorMsg 
      };
    }
  }
}
