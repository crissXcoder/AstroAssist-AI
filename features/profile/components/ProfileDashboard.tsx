"use client";

import React from "react";
import { useAuth } from "@/features/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  LogOut,
  Package,
  Settings,
  CreditCard
} from "lucide-react";

export const ProfileDashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Mi Perfil</h1>
          <p className="text-zinc-400">Gestiona tu información y preferencias de exploración.</p>
        </div>
        <Button 
          variant="destructive" 
          onClick={() => logout()}
          className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <Card className="lg:col-span-2 bg-black/40 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" /> Datos Personales
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Información básica de tu cuenta AstroAssist.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-zinc-500 text-xs uppercase tracking-wider">Nombre Completo</Label>
              <p className="text-white font-medium">{user.fullName || 'No especificado'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-zinc-500 text-xs uppercase tracking-wider">Cédula</Label>
              <p className="text-white font-medium">{user.idNumber || 'No especificado'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-zinc-500 text-xs uppercase tracking-wider">Correo Electrónico</Label>
              <div className="flex items-center gap-2 text-white font-medium">
                <Mail className="w-4 h-4 text-zinc-500" />
                {user.email}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-zinc-500 text-xs uppercase tracking-wider">Rol de Sistema</Label>
              <div className="flex items-center gap-2 text-blue-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                {user.isAdmin ? 'Administrador' : 'Explorador'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" /> Dirección de Entrega
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <p className="text-white text-sm">
                {user.addressLine1 || 'Sin dirección registrada'}
              </p>
              <div className="text-xs text-zinc-500">
                {user.district}, {user.canton}, {user.province}
              </div>
            </div>
            <Button variant="link" className="text-blue-400 p-0 h-auto text-sm hover:text-blue-300">
              Actualizar dirección
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats / Actions */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Mis Pedidos</p>
                <p className="text-xs text-zinc-500">Ver historial de compras</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Métodos de Pago</p>
                <p className="text-xs text-zinc-500">Gestionar tarjetas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-zinc-500/10 rounded-xl group-hover:bg-zinc-500/20 transition-colors">
                <Settings className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Configuración</p>
                <p className="text-xs text-zinc-500">Privacidad y seguridad</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
