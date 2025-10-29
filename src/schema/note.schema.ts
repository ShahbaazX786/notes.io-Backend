import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Note {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  tags: string[];
}

export const NotesSchema = SchemaFactory.createForClass(Note);
