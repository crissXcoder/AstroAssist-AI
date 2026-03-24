"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "@/components/i18n-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // Set cookie natively so the edge returns correctly
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year

    // Strip out the old locale from the pathname and replace it
    // Example: /es/catalogo -> /en/catalogo
    if (!pathname) return;
    const paths = pathname.split('/');
    paths[1] = newLocale;
    const newPath = paths.join('/');
    
    // Force a hard navigation to completely refresh the dicts and avoid React 19 RSC <script> tag errors from next-themes
    window.location.href = newPath;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5 outline-none">
        <Globe className="w-4 h-4" />
        <span className="uppercase tracking-wider mr-1">{currentLocale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50 dark:border-white/10 shadow-xl">
        <DropdownMenuItem 
          onClick={() => switchLanguage('es')}
          className={`cursor-pointer transition-colors ${currentLocale === 'es' ? 'bg-primary/20 text-primary focus:bg-primary/30 focus:text-primary' : 'focus:bg-secondary focus:text-foreground hover:bg-secondary'}`}
        >
          Español
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchLanguage('en')}
          className={`cursor-pointer transition-colors ${currentLocale === 'en' ? 'bg-primary/20 text-primary focus:bg-primary/30 focus:text-primary' : 'focus:bg-secondary focus:text-foreground hover:bg-secondary'}`}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
