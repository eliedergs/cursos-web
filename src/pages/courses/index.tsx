import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Tab,
    Tabs,
    TextField,
} from '@mui/material';

import { Course, CourseModelEnum, CreateCourse } from '@/interfaces/CursoModel';
import { createCourse, getCourses } from '@/services/course';
import '@/styles/main.scss';
import { MenuItem, Select, SelectChangeEvent, Slider } from '@mui/material';

const COURSE_DEFAULT_STATE = {
    nome: '',
    descricao: '',
    modelo: CourseModelEnum.PRESENTIAL,
    vagas: 1,
};

export default () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState<CreateCourse>(COURSE_DEFAULT_STATE);
    const [search, setSearch] = useState('');
    const [coursesList, setCoursesList] = useState<Course[]>([]);
    const [currentTab, setCurrentTab] = useState(0);

    const _onChangeTab = (tab: string) => {
        setCurrentTab(+tab);
        setCourse(COURSE_DEFAULT_STATE);

        if (+tab === 1) {
            _onSearch();
        }
    };

    const _onChangeModel = (event: SelectChangeEvent) => {
        let modelo = CourseModelEnum.PRESENTIAL;

        if (event.target.value === CourseModelEnum.ONLINE) {
            modelo = CourseModelEnum.ONLINE;
        }

        setCourse({ ...course, modelo });
    };

    const _onSave = () => {
        createCourse(course).then(() => {
            alert('Curso cadastrado com sucesso!');
            setCourse(COURSE_DEFAULT_STATE);
        });
    };

    const _onSearch = () => {
        getCourses(search).then((courses) => setCoursesList(courses));
    };

    const _onDetail = (id: string) => {
        navigate(`/${id}`);
    };

    return (
        <Container maxWidth="sm">
            <Tabs
                value={currentTab}
                onChange={(_, value) => _onChangeTab(value)}
                style={{ width: 500 }}
                centered
            >
                <Tab label="Cadastrar" value={0} />
                <Tab label="Buscar" value={1} />
            </Tabs>
            <Box
                padding={3}
                border="1px solid #777"
                borderRadius={4}
                width={500}
            >
                {currentTab === 0 && (
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
                                            typeof value === 'number'
                                                ? value
                                                : +value[0],
                                    })
                                }
                            />
                        </div>
                        <div className="space-between">
                            <Select
                                value={course.modelo}
                                onChange={_onChangeModel}
                            >
                                <MenuItem value={CourseModelEnum.PRESENTIAL}>
                                    Presencial
                                </MenuItem>
                                <MenuItem value={CourseModelEnum.ONLINE}>
                                    Online
                                </MenuItem>
                            </Select>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={_onSave}
                            >
                                Salvar
                            </Button>{' '}
                        </div>
                    </div>
                )}

                {currentTab === 1 && (
                    <div>
                        <div className="align-bottom center">
                            <TextField
                                id="buscar-curso"
                                variant="standard"
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
                            <Button variant="outlined" onClick={_onSearch}>
                                Buscar
                            </Button>
                        </div>
                        <List dense={true}>
                            {coursesList.map((_course) => (
                                <ListItem
                                    key={_course.id}
                                    onClick={() => _onDetail(_course.id)}
                                >
                                    <ListItemButton>
                                        <ListItemText
                                            className="break-word"
                                            primary={_course.nome}
                                            secondary={_course.descricao}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                )}
            </Box>
        </Container>
    );
};
