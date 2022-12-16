import { useEffect, useState } from 'react';

import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    TextField,
} from '@mui/material';

import { CourseModelEnum, CreateCourse } from '@/interfaces/CursoModel';
import DefaultProps from '@/interfaces/DefaultProps';

import '@/styles/main.scss';

type Props = DefaultProps & {
    onSave: (course: CreateCourse) => void;
};

const COURSE_DEFAULT_STATE = {
    nome: '',
    descricao: '',
    modelo: CourseModelEnum.PRESENTIAL,
    vagas: 1,
};

export const CourseForm = ({ onSave }: Props) => {
    const [course, setCourse] = useState<CreateCourse>(COURSE_DEFAULT_STATE);

    useEffect(() => {
        setCourse(COURSE_DEFAULT_STATE);
    }, []);

    const onChangeModel = (event: SelectChangeEvent) => {
        let modelo = CourseModelEnum.PRESENTIAL;

        if (event.target.value === CourseModelEnum.ONLINE) {
            modelo = CourseModelEnum.ONLINE;
        }

        setCourse({ ...course, modelo });
    };

    const _onSave = () => {
        onSave(course);
        setCourse(COURSE_DEFAULT_STATE);
    };

    return (
        <div>
            <TextField
                value={course.nome}
                id="nome-curso"
                label="Nome"
                variant="standard"
                fullWidth
                onChange={(event) =>
                    setCourse({
                        ...course,
                        nome: event.target.value,
                    })
                }
            />
            <TextField
                value={course.descricao}
                id="descricao-curso"
                label="Descrição"
                variant="standard"
                fullWidth
                multiline
                rows={3}
                onChange={(event) =>
                    setCourse({
                        ...course,
                        descricao: event.target.value,
                    })
                }
            />
            <div style={{ marginTop: 10 }}>
                <label>Vagas</label>
                <Slider
                    value={course.vagas}
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={50}
                    onChange={(_, value) =>
                        setCourse({
                            ...course,
                            vagas:
                                typeof value === 'number' ? value : +value[0],
                        })
                    }
                />
            </div>
            <div className="space-between">
                <Select value={course.modelo} onChange={onChangeModel}>
                    <MenuItem value={CourseModelEnum.PRESENTIAL}>
                        Presencial
                    </MenuItem>
                    <MenuItem value={CourseModelEnum.ONLINE}>Online</MenuItem>
                </Select>
                <Button variant="outlined" color="primary" onClick={_onSave}>
                    Salvar
                </Button>
            </div>
        </div>
    );
};
