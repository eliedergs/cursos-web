import { Course, CreateCourse } from '@/interfaces/CursoModel';
import api from './api';

export const createCourse = (course: CreateCourse) => {
    return api.post<CreateCourse, string>('/courses', course);
};

export const getCourses = (nome: string) => {
    return api
        .get<Course[]>('/courses', {
            params: { nome: nome },
        })
        .then((result) => result.data);
};

export const getCourseById = (id: string) => {
    return api.get<Course>(`/courses/${id}`).then((result) => result.data);
};
