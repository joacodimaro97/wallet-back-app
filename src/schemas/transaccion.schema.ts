import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.schema';
import { Billetera } from './billetera.schema';
import { Categoria } from './categoria.schema';
import { TipoTransaccion } from './categoria.schema';

export enum FrecuenciaRecurrencia {
  DIARIA = 'DIARIA',
  SEMANAL = 'SEMANAL',
  MENSUAL = 'MENSUAL',
  ANUAL = 'ANUAL'
}

@Schema({ timestamps: true })
export class Transaccion extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Usuario;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Billetera', required: true })
  billeteraId: Billetera;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Categoria', required: true })
  categoriaId: Categoria;

  @Prop({ required: true })
  monto: number;

  @Prop({ required: true, enum: TipoTransaccion })
  tipo: TipoTransaccion;

  @Prop()
  descripcion: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ default: false })
  esRecurrente: boolean;

  @Prop({
    type: {
      frecuencia: { type: String, enum: FrecuenciaRecurrencia },
      fechaFin: Date
    }
  })
  detallesRecurrencia: {
    frecuencia: FrecuenciaRecurrencia;
    fechaFin?: Date;
  };
}

export const TransaccionSchema = SchemaFactory.createForClass(Transaccion); 