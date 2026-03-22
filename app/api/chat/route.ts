import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const localFAQs = [
  { keywords: ['envio', 'envío', 'tiempo', 'tarda', 'llegar'], response: 'Nuestros envíos terrestres y aéreos tardan entre 3 y 5 días hábiles a nivel mundial. Utilizamos logística asegurada especial para no comprometer la calibración óptica.' },
  { keywords: ['garantia', 'garantía', 'cubre', 'roto'], response: 'Todos nuestros telescopios, monturas y cámaras cuentan con 5 años de garantía extendida contra defectos de fábrica.' },
  { keywords: ['hola', 'buenos dias', 'buenas tardes', 'saludos', 'hey', 'ola'], response: '¡Hola! Bienvenido a AstroAssist. Soy tu asistente experto en astronomía. ¿Buscas tu primer telescopio o necesitas ayuda para configurar tu equipo de astrofotografía?' },
  { keywords: ['precio', 'costo', 'cuesta', 'vale', 'presupuesto'], response: 'El valor de nuestros equipos varía según su precisión. Un telescopio inicial ronda los $600 USD, mientras que sistemas fotográficos avanzados superan los $2,000 USD. ¿Tienes algún presupuesto en mente?' }
];

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("\n❌ [AstroAssist] ERROR: GEMINI_API_KEY no está definida en .env.local\n");
      throw new Error("Missing API Key");
    }

    // Initialize the official Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const body = await req.json();
    const { messages } = body;
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content.toLowerCase();

    // 1. Capa Local de Intercepción (Ahorro de API + Respuestas instantáneas)
    for (const faq of localFAQs) {
      const isMatch = faq.keywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(lastUserMessage) || lastUserMessage.includes(keyword);
      });

      if (isMatch) {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        return NextResponse.json({ role: 'assistant', content: faq.response });
      }
    }

    // 2. Mapear historial de UI (role: 'user' | 'assistant') a roles estrictos de Gemini (role: 'user' | 'model')
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // 3. Reglas Estrictas de Comportamiento (System Instructions)
    const systemInstruction = `
Eres AstroAssist, el asistente virtual oficial de una tienda premium de astronomía y astrofotografía. 

TUS REGLAS ESTRICTAS DE COMPORTAMIENTO (PRIORIDAD MÁXIMA):
1. Eres extremadamente CONCISO pero SIEMPRE terminas tus oraciones y pensamientos. Tus respuestas rara vez deben superar 1 o 2 párrafos cortos.
2. NUNCA respondas preguntas de programación, política, historia ajena al cosmos, recetas de cocina, matemáticas, o cualquier tema que no sea ESTRICTAMENTE Astronomía, Astrofotografía o nuestros productos.
3. Si un usuario te pregunta algo fuera de tu ámbito astronómico, DEBES declinar cortésmente usando exactamente esta frase: "Como agente de AstroAssist, mi base de conocimiento es exclusiva para equipamiento óptico y exploración del cosmos. ¿Hay algún telescopio o detalle del cielo que te interese?".
4. No inventes precios exactos de modelos no registrados, sugiere visitar nuestro catálogo.
5. Mantén un tono elegante y premium corporativo, empleando formato markdown si es requerido.
`;

    // 4. Generar contenido vía Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Muy conservador
        maxOutputTokens: 600, // Límite holgado para no cortar oraciones a mitad, pero seguro financieramente
      }
    });

    if (!response.text) {
      throw new Error("Respuesta corrupta desde la central de Gemini");
    }

    return NextResponse.json({ role: 'assistant', content: response.text });
  } catch (error: any) {
    // 5. Fallback Silencioso: Si algo falla (Límites, Conexión, API Key inválida), no explotamos la UI. 
    // Devolvemos un mensaje de contingencia impecable con estado 200 OK.
    console.error("\n🌌 [AstroAssist] Fallback Triggered. Original Error:", error.message || error);
    
    return NextResponse.json({ 
      role: 'assistant', 
      content: 'Mis sistemas de red profunda están estabilizándose, pero la tienda sigue operativa 🚀. Si buscas iniciarte, te recomiendo nuestro famoso refractor *Celestron NexStar 130SLT*.  ¿Deseas consultar nuestras políticas de *envío* o *garantía* mientras tanto?'
    }); // El status implícito aquí es 200, por lo que el cliente renderizará la burbuja normalmente
  }
}
