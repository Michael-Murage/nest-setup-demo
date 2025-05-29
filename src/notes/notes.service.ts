import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './notes.model';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note)
    private noteModel: typeof Note,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    try {
      return this.noteModel.create({
        content: createNoteDto.content
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    try {
      return this.noteModel.findAll();
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    try {
      return this.noteModel.update({content: updateNoteDto.content}, {
        where: {
          id: id,
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  remove(id: number) {
    try {
      return this.noteModel.destroy({
        where: {
          id: id,
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
