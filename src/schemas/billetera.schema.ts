import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.schema';

export enum TipoBilletera {
  BANCO = 'BANCO',
  CRIPTO = 'CRIPTO',
  INVERSION = 'INVERSION',
  EFECTIVO = 'EFECTIVO',
  OTRO = 'OTRO'
}

@Schema({ timestamps: true })
export class Billetera extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Usuario;

  @Prop({ required: true, enum: TipoBilletera })
  tipo: TipoBilletera;

  @Prop({ required: true, default: 0 })
  saldo: number;

  @Prop({ required: true, default: 'USD' })
  moneda: string;

  @Prop({ default: true })
  estaActiva: boolean;

  @Prop()
  descripcion: string;
}

export const BilleteraSchema = SchemaFactory.createForClass(Billetera); 