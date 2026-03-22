import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const localFAQs = [
  { keywords: ['envio', 'envío', 'tiempo', 'tarda', 'llegar'], response: 'Nuestros envíos terrestres y aéreos tardan entre 3 y 5 días hábiles a nivel mundial. Utilizamos logística asegurada especial para no comprometer la calibración óptica.' },
  { keywords: ['garantia', 'garantía', 'cubre', 'roto'], response: 'Todos nuestros telescopios, monturas y cámaras cuentan con 5 años de garantía extendida contra defectos de fábrica.' },
  { keywords: ['hola', 'buenos dias', 'buenas tardes', 'saludos', 'hey', 'ola'], response: '¡Hola! Bienvenido a AstroAssist. Soy tu asistente experto en astronomía. ¿Buscas tu primer telescopio o necesitas ayuda para configurar tu equipo de astrofotografía?' },
  { keywords: ['precio', 'costo', 'cuesta', 'vale', 'presupuesto'], response: 'El valor de nuestros equipos varía según su precisión. Un telescopio inicial ronda los $600 USD, mientras que sistemas fotográficos avanzados superan los $2,000 USD. ¿Tienes algún presupuesto en mente?' }
];

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("\n❌ [AstroAssist] ERROR: OPENAI_API_KEY no está definida.\n");
      return NextResponse.json({ error: 'El servidor necesita ser reiniciado para absorber la API Key.' }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await req.json();
    const { messages } = body;
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content.toLowerCase();

    // 1. Capa Local de Intercepción (Ahorro del 100% de Tokens en conversaciones comunes)
    for (const faq of localFAQs) {
      const isMatch = faq.keywords.some(keyword => {
        // Validación exacta de la palabra dentro del string buscando separar signos o espacios
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(lastUserMessage) || lastUserMessage.includes(keyword);
      });

      if (isMatch) {
        // Simulamos un tiempo natural de "escritura" para que pase nativamente como el LLM
        await new Promise(resolve => setTimeout(resolve, 800)); 
        return NextResponse.json({ role: 'assistant', content: faq.response });
      }
    }

    // 2. Capa LLM Estricta y Ultra-Económica
    // gpt-4o-mini es por amplia diferencia el modelo moderno más rápido y barato de OpenAI (mucho más rentable que gpt-3.5)
    const systemPrompt = `
Eres AstroAssist, el asistente virtual oficial de una tienda premium de astronomía y astrofotografía. 

TUS REGLAS ESTRICTAS DE COMPORTAMIENTO (PRIORIDAD MÁXIMA):
1. Eres extremadamente CONCISO. Tus respuestas rara vez deben superar 1 o 2 párrafos cortos (esto ahorra tokens y recursos).
2. NUNCA respondas preguntas de programación, política, historia ajena al cosmos, recetas de cocina, matemáticas, o cualquier tema que no sea ESTRICTAMENTE Astronomía, Astrofotografía o nuestros productos.
3. Si un usuario te pregunta algo fuera de tu ámbito astronómico, DEBES declinar cortésmente usando exactamente esta frase: "Como agente de AstroAssist, mi base de conocimiento es exclusiva para equipamiento óptico y exploración del cosmos. ¿Hay algún telescopio o detalle del cielo que te interese?".
4. No inventes precios exactos de modelos no registrados, sugiere visitar nuestro catálogo.
5. Mantén un tono elegante y premium corporativo, empleando formato markdown si es requerido.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', 
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.2, // Muy baja temperatura = El modelo es muy conservador, robótico, y no alucinará ni improvisará respuestas fuera de tema.
      max_tokens: 150, // Límite estricto de generación. Cortará respuestas largas asegurando que un prompt malicioso nunca drene la cuota de la tarjeta de crédito generando un pergamino.
      presence_penalty: 0.0,
      frequency_penalty: 0.0,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("Respuesta corrupta desde la central de OpenAI");
    }

    return NextResponse.json(response.choices[0].message);
  } catch (error: any) {
    console.error("\n❌ [AstroAssist OpenAI Error]:", error.message || error);
    
    return NextResponse.json({ 
      error: 'Error interno de IA',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
