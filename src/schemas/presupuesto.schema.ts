import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.schema';
import { Categoria } from './categoria.schema';

export enum PeriodoPresupuesto {
  MENSUAL = 'MENSUAL',
  TRIMESTRAL = 'TRIMESTRAL',
  SEMESTRAL = 'SEMESTRAL',
  ANUAL = 'ANUAL'
}

@Schema({ timestamps: true })
export class Presupuesto extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Usuario;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Categoria', required: true })
  categoriaId: Categoria;

  @Prop({ required: true })
  monto: number;

  @Prop({ required: true, enum: PeriodoPresupuesto })
  periodo: PeriodoPresupuesto;

  @Prop({ required: true })
  fechaInicio: Date;

  @Prop({ required: true })
  fechaFin: Date;

  @Prop({ default: 0 })
  montoGastado: number;

  @Prop()
  descripcion: string;
}

export const PresupuestoSchema = SchemaFactory.createForClass(Presupuesto); 