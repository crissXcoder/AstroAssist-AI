'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { IsString, IsOptional, Length } from 'class-validator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { User, Phone, Loader2, AlertCircle, Save } from 'lucide-react';
import type { AdminUser } from '../types/admin.types';

/** Schema local para edición básica */
class EditCustomerDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
  fullName: string = '';

  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsOptional()
  phone?: string;
}

interface EditCustomerDialogProps {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, data: { fullName?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
}

export const EditCustomerDialog: React.FC<EditCustomerDialogProps> = ({
  user,
  open,
  onOpenChange,
  onUpdate,
}) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditCustomerDto>({
    resolver: classValidatorResolver(EditCustomerDto),
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.profile?.fullName ?? '',
        phone: user.profile?.phone ?? '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: EditCustomerDto) => {
    if (!user) return;
    setServerError(null);

    const result = await onUpdate(user.id, data);
    if (result.success) {
      onOpenChange(false);
    } else {
      setServerError(result.error ?? 'Error al actualizar el cliente.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950/95 border-white/10 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Editar Cliente
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Actualiza la información básica del cliente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {serverError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="edit-fullName" className="text-zinc-300">Nombre Completo</Label>
            <Input
              id="edit-fullName"
              placeholder="Nombre del cliente"
              className="bg-white/5 border-white/10 text-white"
              {...register('fullName')}
            />
            {errors.fullName && <p className="text-xs text-red-400">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone" className="text-zinc-300">Teléfono</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="edit-phone"
                placeholder="8888-8888"
                className="pl-10 bg-white/5 border-white/10 text-white"
                {...register('phone')}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/10 text-white hover:bg-white/5"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-500 min-w-[120px]"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
