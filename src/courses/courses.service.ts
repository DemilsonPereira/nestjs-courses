import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const course = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });

    return this.courseRepository.save(course);
  }

  async findAll() {
    return await this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Curso com ID ${id} não existe!`);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Curso com ID ${id} não existe!`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);

    if (!course) {
      throw new NotFoundException(`Curso com ID ${id} não existe!`);
    }

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });
    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
