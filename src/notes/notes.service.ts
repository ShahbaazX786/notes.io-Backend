import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { NoteResponseDto } from 'src/dto/noteResponseDto';
import { Note } from 'src/schema/note.schema';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Note.name)
        private noteModel: mongoose.Model<Note>) { };

    async createNote(note): Promise<NoteResponseDto> {
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

    async getNotes(): Promise<NoteResponseDto> {
        let response: NoteResponseDto;
        try {
            const res = await this.noteModel.find({});
            response = {
                success: true,
                message: 'Fetched All Available Notes Successfully',
                size: res.length,
                data: res,
            }
        } catch (error) {
            console.log(error);
            response = {
                success: false,
                message: `Error Fetching Notes: ${error.message}`,
            }
        }
        return response;
    }

    async getNote(id: string): Promise<NoteResponseDto> {
        let response: NoteResponseDto;
        try {
            const res = await this.noteModel.findById({ _id: id });
            response = {
                success: true,
                message: 'Fetched The Particular Note Successfully',
                data: res,
            }
        } catch (error) {
            console.log(error);
            response = {
                success: false,
                message: `Error Fetching Particular Note: ${error.message}`,
            }
        }
        return response;
    }

    async updateNote(id: string, note): Promise<NoteResponseDto> {
        let response: NoteResponseDto;
        try {
            const res = await this.noteModel.findByIdAndUpdate(id, note, { new: true });
            response = {
                success: true,
                message: 'Updated the Particular Note Successfully',
                data: res,
            }
        } catch (error) {
            console.log(error);
            response = {
                success: false,
                message: `Error Updating the particular Note!: ${error.message}`,
            }
        }
        return response;
    }

    async deleteNote(id: string): Promise<NoteResponseDto> {
        let response: NoteResponseDto;
        try {
            const res = await this.noteModel.findByIdAndDelete(id, { new: true });
            response = {
                success: true,
                message: 'Deleted the Particular Note Successfully',
                data: res,
            }
        } catch (error) {
            console.log(error);
            response = {
                success: false,
                message: `Error Deleting the particular Note!: ${error.message}`,
            }
        }
        return response;
    }

}
