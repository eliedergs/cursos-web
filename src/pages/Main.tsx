import { Container } from '@/components/_shared/Container';
import { Route, Routes } from 'react-router-dom';

import CoursesDetailsPage from '@/pages/course-details';
import CousesPage from '@/pages/courses';
import { Toaster } from 'react-hot-toast';

const Main = () => {
    return (
        <Container>
            <>
                <Toaster />
                <Routes>
                    <Route path="/:id" element={<CoursesDetailsPage />} />
                    <Route path="/" element={<CousesPage />} />
                </Routes>
            </>
        </Container>
    );
};
export default Main;
