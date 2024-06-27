import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from 'src/schema/note.schema';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    async addNote(@Body() note: Note) {
        const result = await this.notesService.createNote(note);
        return result;
    }

    @Get()
    async FetchAllNotes() {
        const result = await this.notesService.getNotes();
        return result;
    }
    @Get(':id')
    async FetchNoteById(@Param('id') id: string) {
        const result = await this.notesService.getNote(id);
        return result;
    }

    @Put(':id')
    async updateNoteById(@Param('id') id: string, @Body() note: Note) {
        const result = await this.notesService.updateNote(id, note);
        return result;
    }

    @Delete(':id')
    async DeleteNoteById(@Param('id') id: string) {
        const result = await this.notesService.deleteNote(id);
        return result;
    }
};
