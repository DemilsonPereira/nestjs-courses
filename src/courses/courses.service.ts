import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Curso de NestJS para iniciantes!',
      tags: ['NestJS', 'NodeJS', 'TypeScript', 'JavaScript', 'API'],
    },
  ];

  create(createCourseDto: any) {
    return this.courses.push(createCourseDto);
  }

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => {
      return course.id === id;
    });
    if (!course) {
      throw new NotFoundException(`Course ID ${id} does not exist`);
    }

    return course;
  }

  update(id: number, updateCourseDto: any) {
    const alreadyExists = this.findOne(id);

    if (alreadyExists !== undefined) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses[index] = {
        id,
        ...updateCourseDto, //spread operator(...) que seria a desconstrução de course
      };
    }
  }

  remove(id: number) {
    const alreadyExists = this.findOne(id);

    if (alreadyExists !== undefined) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses.splice(index, 1);
    }
  }
}
