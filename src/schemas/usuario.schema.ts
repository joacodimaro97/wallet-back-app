import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Usuario extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  contraseña: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ default: true })
  estaActivo: boolean;

  @Prop()
  ultimoAcceso: Date;

  @Prop({ default: 'USD' })
  monedaPredeterminada: string;

  @Prop()
  telefono: string;

  @Prop()
  avatar: string;

  @Prop({ type: Object })
  preferencias: {
    notificaciones: boolean;
    tema: string;
    idioma: string;
  };
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario); 