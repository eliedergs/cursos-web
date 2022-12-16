import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Container, Tab, Tabs } from '@mui/material';
import Toast from 'react-hot-toast';

import { Course, CreateCourse } from '@/interfaces/CursoModel';
import { createCourse, getCourses } from '@/services/course';

import { CourseForm } from '@/components/courses/CourseForm';
import { CoursesList } from '@/components/courses/CoursesList';
import '@/styles/main.scss';

export default () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentTab, setCurrentTab] = useState(0);

    const _onChangeTab = (tab: string) => {
        setCurrentTab(+tab);

        if (+tab === 1) {
            onSearch('');
        }
    };

    const onSave = (course: CreateCourse) => {
        createCourse(course).then(() => {
            Toast.success('Curso cadastrado com sucesso!');
        });
    };

    const onSearch = (searchText: string) => {
        getCourses(searchText).then((_courses) => setCourses(_courses));
    };

    const onDetail = (id: string) => {
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
                {currentTab === 0 && <CourseForm onSave={onSave} />}

                {currentTab === 1 && (
                    <CoursesList
                        courses={courses}
                        onSearch={onSearch}
                        onDetail={onDetail}
                    />
                )}
            </Box>
        </Container>
    );
};
