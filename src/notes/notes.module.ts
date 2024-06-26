import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesSchema } from 'src/schema/note.schema';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NotesSchema }])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule { }
