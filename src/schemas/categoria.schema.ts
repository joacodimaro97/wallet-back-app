import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from './usuario.schema';

export enum TipoTransaccion {
  INGRESO = 'INGRESO',
  GASTO = 'GASTO'
}

@Schema({ timestamps: true })
export class Categoria extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Usuario;

  @Prop({ required: true, enum: TipoTransaccion })
  tipo: TipoTransaccion;

  @Prop()
  icono: string;

  @Prop()
  color: string;

  @Prop({ default: false })
  esPredeterminada: boolean;

  @Prop()
  descripcion: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria); 