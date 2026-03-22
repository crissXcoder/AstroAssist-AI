import { Telescope, Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[100px] bg-primary/5 blur-[50px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
                <Telescope className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-glow">AstroAssist AI</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Elevando la experiencia de observación astronómica mediante tecnología inmersiva y asistencia de inteligencia artificial en tiempo real.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Catálogo</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Telescopios</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Monturas</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Astrofotografía</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Accesorios Ópticos</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Soporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">AstroAssist AI</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Envíos y Garantías</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Guías para Principiantes</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AstroAssist AI. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
