import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
        const result = await this.notesService.getNoteById(id);
        return result;
    }
};
