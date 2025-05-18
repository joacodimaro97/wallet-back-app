import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('usuarios')
  async crearUsuario(@Body() usuarioData: any) {
    const usuario = new this.usuarioModel(usuarioData);
    return await usuario.save();
  }
}
