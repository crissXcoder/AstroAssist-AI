'use client';

import React, { useState } from 'react';
import { RegisterDto } from '@shared/dto/register.dto';
import { useAuth } from '@/features/auth';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { RegisterFormSteps } from './RegisterFormSteps';

/**
 * Componente principal de Registro.
 * Gestiona el estado de éxito y delega el formulario a RegisterFormSteps.
 */
export const RegisterForm = () => {
  const { register: registerAction } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: RegisterDto) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      await registerAction(data);
      setIsSuccess(true);
    } catch (err: any) {
      setServerError(err.message || 'Error al crear la cuenta. Intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4 bg-black overflow-hidden">
        <Card className="w-full max-w-md bg-black/40 border-white/10 backdrop-blur-xl p-8 text-center animate-in fade-in zoom-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-500/10 rounded-full border border-green-500/20">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-2">¡Cuenta Creada!</CardTitle>
          <CardDescription className="text-zinc-400 mb-8">
            Bienvenido a bordo. Tu cuenta ha sido configurada con éxito.
          </CardDescription>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-500">
            <Link href="/login">Ir a Iniciar Sesión</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Card className="w-full max-w-lg relative bg-black/40 border-white/10 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <UserPlus className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Únete a AstroAssist</CardTitle>
          <CardDescription className="text-zinc-400">
            Comienza tu viaje con nuestra plataforma inteligente
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-6">
          <RegisterFormSteps 
            onSubmit={handleSubmit} 
            serverError={serverError} 
            isSubmitting={isSubmitting} 
          />
        </div>

        <CardFooter className="flex justify-center border-t border-white/5 py-4">
          <p className="text-sm text-zinc-500">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Inicia Sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
