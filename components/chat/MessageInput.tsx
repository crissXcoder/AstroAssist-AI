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
    <form onSubmit={onSubmit} className="flex gap-3 w-full">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu consulta astronómica..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !input.trim()}
        className="rounded-full h-12 w-12 bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all shrink-0"
      >
        <SendHorizontal className="w-5 h-5 text-on-primary" />
      </Button>
    </form>
  );
}
