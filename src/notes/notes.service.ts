import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { NoteResponseDto } from 'src/dto/noteResponseDto';
import { Note } from 'src/schema/note.schema';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Note.name)
        private noteModel: mongoose.Model<Note>) { };

    async createNote(note): Promise<any> {
        let response: NoteResponseDto;
        try {
            const res = await this.noteModel.create(note);
            response = {
                success: true,
                message: 'Note created successfully',
                data: res,
            }
        } catch (error) {
            console.log(error);
            response = {
                success: false,
                message: `Error Creating Notes: ${error.message}`,
            }
        }
        return response;
    }
}
