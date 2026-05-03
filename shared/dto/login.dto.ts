import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
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
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password!: string;
}
