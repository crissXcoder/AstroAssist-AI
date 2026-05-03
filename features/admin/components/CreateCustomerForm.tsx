'use client';

import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { CreateCustomerDto } from '../schemas/create-customer.schema';
import { useGeo } from '@/features/auth/hooks/useGeo';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Combobox } from '@/shared/components/ui/combobox';
import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Phone,
  User,
  UserPlus,
} from 'lucide-react';

interface CreateCustomerFormProps {
  onSubmit: (data: CreateCustomerDto) => Promise<void>;
  serverError: string | null;
  isSubmitting: boolean;
}

export const CreateCustomerForm: React.FC<CreateCustomerFormProps> = ({
  onSubmit,
  serverError,
  isSubmitting,
}) => {
  const [step, setStep] = React.useState(1);
  const TOTAL_STEPS = 4;

  const {
    provinces,
    cantons,
    districts,
    loadCantons,
    loadDistricts,
    loadingProvinces,
    loadingCantons,
    loadingDistricts,
  } = useGeo();

  const form = useForm<CreateCustomerDto>({
    resolver: classValidatorResolver(CreateCustomerDto),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const selectedProvince = watch('province');
  const selectedCanton = watch('canton');

  const nextStep = async () => {
    type FieldName = keyof CreateCustomerDto;
    let fieldsToValidate: FieldName[] = [];
    if (step === 1) fieldsToValidate = ['cedula', 'fullName', 'birthDate'];
    if (step === 2) fieldsToValidate = ['email', 'phone'];
    if (step === 3) fieldsToValidate = ['province', 'canton', 'district', 'town', 'exactAddress'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-4">
        <p className="text-xs text-zinc-500 mb-2">
          Paso {step} de {TOTAL_STEPS}
        </p>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4 min-h-[220px]">
        {serverError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-sm text-red-400">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>{serverError}</p>
          </div>
        )}

        {/* Paso 1: Personal */}
        {step === 1 && (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <div className="space-y-2">
              <Label htmlFor="admin-cedula" className="text-zinc-300">Cédula</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input id="admin-cedula" placeholder="0-0000-0000" className="pl-10 bg-white/5 border-white/10 text-white" {...register('cedula')} />
              </div>
              {errors.cedula && <p className="text-xs text-red-400">{errors.cedula.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-fullName" className="text-zinc-300">Nombre Completo</Label>
              <Input id="admin-fullName" placeholder="Juan Pérez" className="bg-white/5 border-white/10 text-white" {...register('fullName')} />
              {errors.fullName && <p className="text-xs text-red-400">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-birthDate" className="text-zinc-300">Fecha de Nacimiento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input id="admin-birthDate" type="date" className="pl-10 bg-white/5 border-white/10 text-white" {...register('birthDate')} />
              </div>
              {errors.birthDate && <p className="text-xs text-red-400">{errors.birthDate.message}</p>}
            </div>
          </div>
        )}

        {/* Paso 2: Contacto */}
        {step === 2 && (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-zinc-300">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input id="admin-email" type="email" placeholder="juan@ejemplo.com" className="pl-10 bg-white/5 border-white/10 text-white" {...register('email')} />
              </div>
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-phone" className="text-zinc-300">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input id="admin-phone" placeholder="8888-8888" className="pl-10 bg-white/5 border-white/10 text-white" {...register('phone')} />
              </div>
              {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
            </div>
          </div>
        )}

        {/* Paso 3: Ubicación */}
        {step === 3 && (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-zinc-300">Provincia</Label>
                <Combobox
                  options={provinces.map((p) => ({ label: p.name, value: p.id }))}
                  value={selectedProvince}
                  onChange={(val) => {
                    setValue('province', val);
                    setValue('canton', '');
                    setValue('district', '');
                    loadCantons(val);
                  }}
                  disabled={loadingProvinces}
                  placeholder="Provincia"
                />
                {errors.province && <p className="text-xs text-red-400">{errors.province.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">Cantón</Label>
                <Combobox
                  options={cantons.map((c) => ({ label: c.name, value: c.id }))}
                  value={selectedCanton}
                  onChange={(val) => {
                    setValue('canton', val);
                    setValue('district', '');
                    loadDistricts(selectedProvince, val);
                  }}
                  disabled={!selectedProvince || loadingCantons}
                  placeholder="Cantón"
                />
                {errors.canton && <p className="text-xs text-red-400">{errors.canton.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Distrito</Label>
              <Combobox
                options={districts.map((d) => ({ label: d.name, value: d.id }))}
                value={watch('district')}
                onChange={(val) => setValue('district', val)}
                disabled={!selectedCanton || loadingDistricts}
                placeholder="Distrito"
              />
              {errors.district && <p className="text-xs text-red-400">{errors.district.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-town" className="text-zinc-300">Localidad / Barrio</Label>
              <Input id="admin-town" placeholder="San José Centro" className="bg-white/5 border-white/10 text-white" {...register('town')} />
              {errors.town && <p className="text-xs text-red-400">{errors.town.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-exactAddress" className="text-zinc-300">Dirección Exacta</Label>
              <Input id="admin-exactAddress" placeholder="Frente a la plaza..." className="bg-white/5 border-white/10 text-white" {...register('exactAddress')} />
              {errors.exactAddress && <p className="text-xs text-red-400">{errors.exactAddress.message}</p>}
            </div>
          </div>
        )}

        {/* Paso 4: Seguridad */}
        {step === 4 && (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-zinc-300">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input id="admin-password" type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/10 text-white" {...register('password')} />
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-confirmPassword" className="text-zinc-300">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input id="admin-confirmPassword" type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/10 text-white" {...register('confirmPassword')} />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>
            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg space-y-2">
              <h4 className="text-sm font-medium text-blue-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Resumen
              </h4>
              <div className="text-xs text-zinc-400 space-y-1">
                <p>Nombre: {watch('fullName')}</p>
                <p>Cédula: {watch('cedula')}</p>
                <p>Correo: {watch('email')}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navegación */}
      <div className="flex justify-between gap-4 mt-6 pt-4 border-t border-white/6">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep} className="border-white/10 text-white hover:bg-white/5">
            <ChevronLeft className="w-4 h-4 mr-2" /> Atrás
          </Button>
        ) : (
          <div />
        )}
        {step < TOTAL_STEPS ? (
          <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-500">
            Siguiente <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 min-w-[140px]">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
            {isSubmitting ? 'Creando...' : 'Crear Cliente'}
          </Button>
        )}
      </div>
    </form>
  );
};
