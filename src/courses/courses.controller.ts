import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const createCourse = await this.coursesService.create(createCourseDto);

    if (createCourse) {
      return {
        message: 'Curso criado com sucesso',
      };
    }
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const updateCourse = await this.coursesService.update(+id, updateCourseDto);

    if (updateCourse) {
      return {
        message: 'Curso atualizado com sucesso',
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removeCourse = await this.coursesService.remove(+id);

    if (removeCourse) {
      return {
        message: 'Curso removido com sucesso',
      };
    }
  }
}
