import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
//import { Cliente } from './clientes/entities/cliente.entity';n
import { ReservasModule } from './reservas/reservas.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { ServiciosModule } from './servicios/servicios.module';

import { PagoModule } from './pago/pago.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { SugerenciasModule } from './sugerencias/sugerencias.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '**/*.entity.ts'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientesModule,
    ReservasModule,
    HabitacionesModule,
    ServiciosModule,
    PagoModule,
    UsuariosModule,
    AuthModule,
    SugerenciasModule,
    // UsuariosModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
