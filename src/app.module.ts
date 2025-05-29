import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from './notes/notes.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NotesModule,
    SequelizeModule.forRoot({
      dialect:'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [Note],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Note]),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
