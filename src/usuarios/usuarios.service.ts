import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '../schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async crear(usuarioData: any): Promise<Usuario> {
    const usuario = new this.usuarioModel(usuarioData);
    return await usuario.save();
  }

  async obtenerTodos(): Promise<Usuario[]> {
    return await this.usuarioModel.find().exec();
  }

  async obtenerPorId(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async obtenerPorEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findOne({ email }).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return usuario;
  }

  async actualizar(id: string, usuarioData: any): Promise<Usuario> {
    const usuario = await this.usuarioModel
      .findByIdAndUpdate(id, usuarioData, { new: true })
      .exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async eliminar(id: string): Promise<void> {
    const resultado = await this.usuarioModel.deleteOne({ _id: id }).exec();
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }
} 