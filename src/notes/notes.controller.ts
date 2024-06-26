import { Body, Controller, Post } from '@nestjs/common';
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
}
