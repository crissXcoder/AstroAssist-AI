import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
  IsDateString,
} from 'class-validator';

/**
 * DTO class-validator para formulario de crear cliente en admin.
 * Alineado con CreateUserByAdminDto del backend.
 * Usado con @hookform/resolvers/class-validator.
 */
export class CreateCustomerDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
  confirmPassword!: string;

  @IsString()
  @IsNotEmpty({ message: 'La cédula es obligatoria' })
  @Matches(/^[0-9-]+$/, { message: 'Formato de cédula inválido' })
  cedula!: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  fullName!: string;

  @IsDateString({}, { message: 'Fecha de nacimiento inválida' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  birthDate!: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  phone!: string;

  // ── Dirección ──
  @IsString()
  @IsNotEmpty({ message: 'La provincia es obligatoria' })
  province!: string;

  @IsString()
  @IsNotEmpty({ message: 'El cantón es obligatorio' })
  canton!: string;

  @IsString()
  @IsNotEmpty({ message: 'El distrito es obligatorio' })
  district!: string;

  @IsString()
  @IsNotEmpty({ message: 'La localidad es obligatoria' })
  town!: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección exacta es obligatoria' })
  exactAddress!: string;

  @IsString()
  @IsOptional()
  postalCode?: string;
}
