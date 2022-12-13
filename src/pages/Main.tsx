import { Container } from '@/components/_shared/Container';
import { Route, Routes } from 'react-router-dom';

import CoursesDetailsPage from '@/pages/course-details';
import CousesPage from '@/pages/courses';

const Main = () => {
    return (
        <Container>
            <Routes>
                <Route path="/:id" element={<CoursesDetailsPage />} />
                <Route path="/" element={<CousesPage />} />
            </Routes>
        </Container>
    );
};
export default Main;
