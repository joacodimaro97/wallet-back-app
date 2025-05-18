import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.schema';

export enum EstadoObjetivo {
  ACTIVO = 'ACTIVO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO'
}

@Schema({ timestamps: true })
export class ObjetivoAhorro extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Usuario;

  @Prop({ required: true })
  montoObjetivo: number;

  @Prop({ required: true, default: 0 })
  montoActual: number;

  @Prop()
  fechaLimite: Date;

  @Prop({ required: true, enum: EstadoObjetivo, default: EstadoObjetivo.ACTIVO })
  estado: EstadoObjetivo;

  @Prop()
  descripcion: string;

  @Prop({ default: false })
  esCompletado: boolean;
}

export const ObjetivoAhorroSchema = SchemaFactory.createForClass(ObjetivoAhorro); 