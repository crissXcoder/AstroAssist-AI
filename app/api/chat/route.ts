import { NextResponse } from 'next/server';
import { GeminiClient } from '@/features/chat/services/gemini-client';
import { detectIntent, getProductContext, getSetupContext } from '@/features/chat/utils/ai-logic';
import { ChatMessage, GeminiContent } from '@/features/chat/types/chat.types';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    
    console.log("🚀 [API/Chat] Nueva petición recibida");

    if (!apiKey) {
      console.error("❌ [API/Chat] GEMINI_API_KEY no configurada en el entorno.");
      return NextResponse.json({ 
        role: 'assistant', 
        content: "Error: No se encontró la API Key en el servidor. Asegúrate de que .env.local esté configurado correctamente.",
        status: 'error_auth'
      }, { status: 401 });
    }

    const body = await req.json();
    const { messages } = body;
    
    if (!messages || messages.length === 0) {
      console.warn("⚠️ [API/Chat] Petición sin mensajes");
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content;
    console.log(`💬 [API/Chat] Mensaje del usuario: "${lastUserMessage.substring(0, 50)}..."`);

    const intent = detectIntent(lastUserMessage);
    const productContext = getProductContext(intent, lastUserMessage);
    const setupContext = getSetupContext(lastUserMessage);

    const history: ChatMessage[] = messages.slice(-10); 
    const contents: GeminiContent[] = history.map((m: ChatMessage) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const systemInstruction = `
Eres AstroAssist, un Asistente Experto en Astronomía y Asesor de Compras Senior.
Tu misión es transformar la curiosidad del usuario en una decisión de compra informada basada ÚNICAMENTE en los productos proporcionados en el CONTEXTO DEL CATÁLOGO.

### CONTEXTO DEL CATÁLOGO
${productContext}
${setupContext ? `### SETUPS RECOMENDADOS\n${setupContext}` : ""}

### ESTRUCTURA DE RESPUESTA OBLIGATORIA
Debes responder usando EXACTAMENTE estas secciones en este orden:

1. **[ENTENDIMIENTO]**: Una frase corta demostrando que entiendes la necesidad del usuario.
2. **[RECOMENDACIÓN]**: El nombre de un producto del catálogo seguido de su identificador en formato [[PRODUCT:id]]. Ejemplo: "Celestron NexStar 130SLT [[PRODUCT:celestron-130slt]]". Si no tienes una recomendación clara aún, indica que necesitas más información.
3. **[POR QUÉ]**: Justificación técnica basada en las características del producto y las necesidades del usuario.
4. **[PRÓXIMO PASO]**: Una pregunta o sugerencia para continuar la exploración.

### REGLAS CRÍTICAS
- **Identificadores**: NUNCA inventes un ID. Usa solo los del catálogo. Si no estás seguro, usa el producto más cercano disponible en el contexto.
- **Fallback**: Si el usuario pregunta algo totalmente fuera de lugar (como comida o política), declina amablemente y redirige la conversación a la astronomía.
- **Formato**: Mantén siempre los encabezados en negrita y corchetes (ej: **[ENTENDIMIENTO]**).
- **Integridad**: No dejes frases a medias. Si recomiendas algo, asegúrate de mencionar el nombre completo.
`;
    const client = new GeminiClient(apiKey, modelName);
    const result = await client.generate(lastUserMessage, contents, systemInstruction);

    if (result.status !== 'online') {
      console.warn(`⚠️ [API/Chat] Gemini falló con estado: ${result.status}`);
      
      const statusCode = result.status === 'error_auth' ? 401 : result.status === 'error_quota' ? 429 : 503;
      
      return NextResponse.json({
        role: 'assistant',
        content: result.errorDetail || "El servicio no está disponible temporalmente.",
        status: result.status,
        isError: true
      }, { status: statusCode });
    }

    // Improved sanitation: only remove clear artifacts, not partial words
    const sanitizedResponse = result.content
      .replace(/\[object Object\]/g, "")
      .trim();

    console.log("✅ [API/Chat] Respuesta generada exitosamente");

    return NextResponse.json({ 
      role: 'assistant', 
      content: sanitizedResponse,
      status: 'online'
    });

  } catch (error: unknown) {
    console.error("🌌 [API/Chat] Error Fatal:", error);
    const errorMessage = error instanceof Error ? error.message : "Error inesperado en el servidor de AstroAssist.";
    return NextResponse.json({ 
      role: 'assistant', 
      content: errorMessage,
      status: 'offline',
      isError: true
    }, { status: 500 });
  }
}
