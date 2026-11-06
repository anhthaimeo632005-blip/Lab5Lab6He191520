import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SyllabusList from './pages/SyllabusList';
import SubjectDetail from './pages/SubjectDetail';

import { getUser } from './config';

function Private({ children }) {
    return getUser() ? children : <Navigate to="/login" replace />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/syllabus" element={<Private><SyllabusList /></Private>} />
                <Route path="/subject/:id" element={<Private><SubjectDetail /></Private>} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;