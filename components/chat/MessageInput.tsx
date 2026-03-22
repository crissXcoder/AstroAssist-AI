"use client";

import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
};

export function MessageInput({ input, setInput, onSubmit, isLoading }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu consulta astronómica..."
        disabled={isLoading}
        className="flex-1 bg-background/50 border-white/10 rounded-xl focus-visible:ring-primary/50 text-base md:text-sm shadow-inner"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !input.trim()}
        className="rounded-xl h-10 w-10 bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all shrink-0 hover:scale-105"
      >
        <SendHorizontal className="w-5 h-5" />
      </Button>
    </form>
  );
}
