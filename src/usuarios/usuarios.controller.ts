import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Put, 
  Param, 
  Delete, 
  HttpStatus, 
  HttpCode,
  Query,
  ParseIntPipe,
  DefaultValuePipe
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../schemas/usuario.schema';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() usuarioData: any): Promise<Usuario> {
    return await this.usuariosService.crear(usuarioData);
  }

  @Get()
  async obtenerTodos(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('nombre') nombre?: string,
    @Query('email') email?: string,
  ): Promise<Usuario[]> {
    return await this.usuariosService.obtenerTodos();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string): Promise<Usuario> {
    return await this.usuariosService.obtenerPorId(id);
  }

  @Get('email/:email')
  async obtenerPorEmail(@Param('email') email: string): Promise<Usuario> {
    return await this.usuariosService.obtenerPorEmail(email);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() usuarioData: any,
  ): Promise<Usuario> {
    return await this.usuariosService.actualizar(id, usuarioData);
  }

  @Put(':id/activar')
  async activarUsuario(@Param('id') id: string): Promise<Usuario> {
    return await this.usuariosService.actualizar(id, { estaActivo: true });
  }

  @Put(':id/desactivar')
  async desactivarUsuario(@Param('id') id: string): Promise<Usuario> {
    return await this.usuariosService.actualizar(id, { estaActivo: false });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string): Promise<void> {
    await this.usuariosService.eliminar(id);
  }
} 