import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);

    return this.courseRepository.save(course);
  }

  async findAll() {
    return await this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new NotFoundException(`Course ID ${id} does not exist`);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
    });

    if (!course) {
      throw new NotFoundException(`Course ID ${id} does not exist`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);

    if (!course) {
      throw new NotFoundException(`Course ID ${id} does not exist`);
    }

    return this.courseRepository.remove(course);
  }
}
