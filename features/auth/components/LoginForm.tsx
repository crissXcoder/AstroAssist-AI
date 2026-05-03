"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { LoginDto } from "@shared/dto/login.dto";
import { useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { 
  LogIn, 
  Mail, 
  Lock, 
  Loader2, 
  AlertCircle,
  Telescope
} from "lucide-react";
import Link from "next/link";

/**
 * LoginForm con efecto visual Nova y validación class-validator
 */
export const LoginForm = () => {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: classValidatorResolver(LoginDto),
  });

  // Efecto visual de fondo (Partículas espaciales)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; radius: number; speed: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const onSubmit = async (data: LoginDto) => {
    setServerError(null);
    try {
      await login(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Error al iniciar sesión. Verifique sus credenciales.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-black overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

      <Card className="w-full max-w-md relative bg-black/40 border-white/10 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-500">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <Telescope className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            AstroAssist AI
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Ingresa a tu cuenta para continuar la exploración
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {serverError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-sm text-red-400 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <p>{serverError}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="email"
                  placeholder="nombre@ejemplo.com"
                  type="email"
                  className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-blue-500/50 transition-colors ${
                    errors.email ? 'border-red-500/50 focus:border-red-500/50' : ''
                  }`}
                  {...register("email")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">Contraseña</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="password"
                  type="password"
                  className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-blue-500/50 transition-colors ${
                    errors.password ? 'border-red-500/50 focus:border-red-500/50' : ''
                  }`}
                  {...register("password")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4 mt-2">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
              {isSubmitting ? "Autenticando..." : "Iniciar Sesión"}
            </Button>
            
            <p className="text-sm text-zinc-500 text-center">
              ¿No tienes una cuenta?{" "}
              <Link 
                href="/register" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Regístrate gratis
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
