export enum CourseModelEnum {
    PRESENTIAL = 'presencial',
    ONLINE = 'online',
}

export interface Course {
    id: string;
    nome: string;
    descricao: string;
    modelo: CourseModelEnum;
    vagas: number;
}

export interface CreateCourse {
    nome: string;
    descricao: string;
    modelo: CourseModelEnum;
    vagas: number;
}
