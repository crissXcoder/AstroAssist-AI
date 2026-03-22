import { useState, useEffect } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('astroassist_chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, createdAt: new Date(m.createdAt) })));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    } else {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: '¡Hola! Soy AstroAssist. ¿En qué puedo ayudarte a explorar el universo hoy?',
          createdAt: new Date(),
        }
      ]);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('astroassist_chat', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) 
        }),
      });

      // Si el servidor falla, tratamos de extraer el error preciso
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || 'Error desconocido del servidor (500)');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage = err.message || 'Error de conexión';
      setError(errorMessage);
      console.error("🔴 AI Chat Error:", err);
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Lo siento, ocurrió un error crítico:\n\`${errorMessage}\`\n\nPor favor revisa la consola o reinicia el servidor.`,
        createdAt: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('astroassist_chat');
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Memoria restablecida. Sistema listo para una nueva conversación estelar. 🚀',
      createdAt: new Date(),
    }]);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    sendMessage,
    clearHistory
  };
}
