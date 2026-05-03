'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { CreateCustomerForm } from './CreateCustomerForm';
import { CreateCustomerDto } from '../schemas/create-customer.schema';
import type { CreateCustomerPayload } from '../types/admin.types';

interface CreateCustomerDialogProps {
  onCreateCustomer: (payload: CreateCustomerPayload) => Promise<any>;
}

/**
 * Dialog contenedor para la creación de un nuevo cliente.
 * Gestiona la visibilidad y el flujo de éxito, delegando el formulario a CreateCustomerForm.
 */
export const CreateCustomerDialog: React.FC<CreateCustomerDialogProps> = ({ onCreateCustomer }) => {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetDialog = () => {
    setServerError(null);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) resetDialog();
  };

  const handleSubmit = async (data: CreateCustomerDto) => {
    setServerError(null);
    setIsSubmitting(true);

    // Reestructurar campos flat → nested payload para el backend
    const payload: CreateCustomerPayload = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      cedula: data.cedula,
      fullName: data.fullName,
      birthDate: data.birthDate,
      phone: data.phone,
      address: {
        province: data.province,
        canton: data.canton,
        district: data.district,
        town: data.town,
        exactAddress: data.exactAddress,
        postalCode: data.postalCode,
      },
    };

    try {
      await onCreateCustomer(payload);
      setIsSuccess(true);
    } catch (error: any) {
      setServerError(error?.response?.data?.message || 'Error al crear el cliente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
          <UserPlus className="w-4 h-4" />
          Crear Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-zinc-950/95 border-white/10 backdrop-blur-xl">
        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in">
            <div className="flex justify-center">
              <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">¡Cliente Creado!</h3>
              <p className="text-sm text-zinc-400 mt-1">
                El nuevo cliente ha sido registrado exitosamente.
              </p>
            </div>
            <Button onClick={() => onOpenChange(false)} className="bg-blue-600 hover:bg-blue-500 w-full">
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" />
                Nuevo Cliente
              </DialogTitle>
            </DialogHeader>

            <CreateCustomerForm 
              onSubmit={handleSubmit} 
              serverError={serverError}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
