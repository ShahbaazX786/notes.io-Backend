import { Note } from 'src/schema/note.schema';

export interface NoteResponseDto {
  success: boolean;
  message: string;
  data?: Note | Note[];
  size?: number;
}
