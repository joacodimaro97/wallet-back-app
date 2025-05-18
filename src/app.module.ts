import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';

// Importar schemas
import { Usuario, UsuarioSchema } from './schemas/usuario.schema';
import { Billetera, BilleteraSchema } from './schemas/billetera.schema';
import { Categoria, CategoriaSchema } from './schemas/categoria.schema';
import { Transaccion, TransaccionSchema } from './schemas/transaccion.schema';
import { ObjetivoAhorro, ObjetivoAhorroSchema } from './schemas/objetivo-ahorro.schema';
import { Presupuesto, PresupuestoSchema } from './schemas/presupuesto.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/wallet-app'),
    MongooseModule.forFeature([
      { name: Usuario.name, schema: UsuarioSchema },
      { name: Billetera.name, schema: BilleteraSchema },
      { name: Categoria.name, schema: CategoriaSchema },
      { name: Transaccion.name, schema: TransaccionSchema },
      { name: ObjetivoAhorro.name, schema: ObjetivoAhorroSchema },
      { name: Presupuesto.name, schema: PresupuestoSchema },
    ]),
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
