"use client";

import { SectionContainer } from "@/components/ui/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquareQuote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Carlos Rivera",
      role: "Astrofotógrafo Aficionado",
      text: "AstroAssist me ayudó a confirmar que la montura EQ6-R Pro soportaría mi telescopio reflector de 8 pulgadas. Comprar sin miedo al error es invaluable.",
      initials: "CR"
    },
    {
      name: "Elena Marín",
      role: "Estudiante de Astronomía",
      text: "Pregunté por un equipo para ver los anillos de Saturno por primera vez. El chatbot me guio hacia el NexStar 130SLT y la experiencia superó mis expectativas.",
      initials: "EM"
    },
    {
      name: "Javier Soto",
      role: "Fotógrafo Profesional",
      text: "La sugerencia sobre la cámara ZWO ASI con refrigeración resolvió todos mis problemas de ruido térmico. Excelente atención técnica automatizada.",
      initials: "JS"
    }
  ];

  return (
    <SectionContainer delay={0.2} className="py-24 border-t border-border/40 relative">
      <div className="absolute inset-0 bg-background/80" />
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <MessageSquareQuote className="w-10 h-10 text-primary opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Comunidad Astronómica</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            Descubre cómo nuestra plataforma está transformando la manera en que los exploradores del cosmos eligen su equipamiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
             <Card key={i} className="glass border-primary/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(var(--primary),0.15)]">
               <CardHeader className="flex flex-row items-center gap-4 pb-2">
                 <Avatar className="border border-primary/20 bg-primary/5">
                   <AvatarFallback className="bg-transparent text-primary font-bold">{review.initials}</AvatarFallback>
                 </Avatar>
                 <div className="flex flex-col">
                   <h4 className="font-semibold text-base text-foreground">{review.name}</h4>
                   <p className="text-xs text-primary/80">{review.role}</p>
                 </div>
               </CardHeader>
               <CardContent className="pt-4 text-muted-foreground text-sm italic leading-relaxed">
                 "{review.text}"
               </CardContent>
             </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
