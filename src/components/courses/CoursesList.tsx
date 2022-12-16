import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
} from '@mui/material';

import { Course } from '@/interfaces/CursoModel';
import DefaultProps from '@/interfaces/DefaultProps';

import '@/styles/main.scss';

type Props = DefaultProps & {
    courses: Course[];
    onSearch: (title: string) => void;
    onDetail: (id: string) => void;
};

export const CoursesList = ({ courses, onSearch, onDetail }: Props) => {
    const _onSearch = (searchText: string) => {
        onSearch(searchText);
    };

    const _onDetail = (id: string) => {
        onDetail(id);
    };

    return (
        <div>
            <div className="align-bottom center">
                <TextField
                    id="buscar-curso"
                    label="Buscar"
                    variant="standard"
                    fullWidth
                    onChange={(event) => _onSearch(event.target.value)}
                />
            </div>
            <List dense={true}>
                {courses.map((course) => (
                    <ListItem
                        key={course.id}
                        onClick={() => _onDetail(course.id)}
                    >
                        <ListItemButton>
                            <ListItemText
                                className="break-word"
                                primary={course.nome}
                                secondary={course.descricao}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
