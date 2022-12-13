import { useEffect, useState } from 'react';

import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { Course } from '@/interfaces/CursoModel';
import { getCourseById } from '@/services/course';

import { DataItem } from '@/components/_shared/DataItem';
import { ChevronLeft } from '@mui/icons-material';

export default () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setCourse] = useState<Course>();

    useEffect(() => {
        if (id) getCourseById(id).then((_course) => setCourse(_course));
    }, []);

    const _onBack = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Box
                padding={3}
                width={500}
                border="1px solid #777"
                borderRadius={4}
            >
                <Button variant="text" onClick={_onBack}>
                    <ChevronLeft color="action" fontSize="medium" />
                </Button>

                <Typography variant="subtitle1" textAlign="center" gutterBottom>
                    {course?.nome}
                </Typography>
                <Typography variant="caption" textAlign="center" gutterBottom>
                    {course?.descricao}
                </Typography>
                <div className="space-between">
                    <DataItem title="Vagas" subtitle={course?.vagas} />
                    <DataItem title="Modelo" subtitle={course?.modelo} />
                </div>
            </Box>
        </Container>
    );
};
