import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Query as ExpresQuery } from 'express-serve-static-core';
import { NotesService } from './notes.service';
import { CreateNoteDto } from 'src/dto/note/create-note.dto';
import { UpdateNoteDto } from 'src/dto/note/update-note.dto';
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async addNote(@Body() note: CreateNoteDto) {
    const result = await this.notesService.createNote(note);
    return result;
  }

  @Get('all')
  async getAllNotes(@Query() query: ExpresQuery) {
    const result = await this.notesService.findAll(query);
    return result;
  }

  @Get(':id')
  async FetchNoteById(@Param('id') id: string) {
    const result = await this.notesService.getNote(id);
    return result;
  }

  @Put(':id')
  async updateNoteById(@Param('id') id: string, @Body() note: UpdateNoteDto) {
    const result = await this.notesService.updateNote(id, note);
    return result;
  }

  @Delete(':id')
  async DeleteNoteById(@Param('id') id: string) {
    const result = await this.notesService.deleteNote(id);
    return result;
  }

  @Delete()
  async DeleteAllNotes() {
    const result = await this.notesService.deleteAllNotes();
    return result;
  }
}
