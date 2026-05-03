import { 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  IsString, 
  IsDateString, 
  IsOptional, 
  Matches 
} from 'class-validator';

/**
 * DTO para el inicio de sesión
 */
export class LoginDto {
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;
}

/**
 * DTO para el registro de cliente (Costa Rica focus)
 */
export class RegisterDto {
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

  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string;

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
  city!: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección exacta es obligatoria' })
  exactAddress!: string;

  @IsString()
  @IsOptional()
  postalCode?: string;
}
