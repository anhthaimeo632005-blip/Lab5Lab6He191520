import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Container, Button, Form, Table, Row, Col } from 'react-bootstrap';
import { API, getUser } from '../config';

export default function SyllabusList() {
    const [subjects, setSubjects] = useState([]);
    const [field, setField] = useState('code');
    const [keyword, setKeyword] = useState('');
    const [applied, setApplied] = useState({ field: 'code', keyword: '' });
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        axios.get(`${API}/subjects`).then((r) => setSubjects(r.data));
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const shown = subjects.filter((s) =>
        String(s[applied.field]).toLowerCase().includes(applied.keyword.trim().toLowerCase())
    );

    return (
        <>
            <Navbar bg="secondary" variant="dark" className="px-3">
                <Navbar.Brand>FPT Education Learning Materials Portal</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="me-3 text-white">
                        Hello, {user.fullName} ({user.role})
                    </Navbar.Text>
                    <Button size="sm" variant="light" onClick={logout}>Logout</Button>
                </Navbar.Collapse>
            </Navbar>

            <Container className="mt-4">
                <h3>Syllabus Management</h3>
                <Row className="my-3 align-items-center">
                    <Col xs="auto"><b>Search by:</b></Col>
                    <Col xs={3}>
                        <Form.Select value={field} onChange={(e) => setField(e.target.value)}>
                            <option value="code">Code</option>
                            <option value="name">Name</option>
                        </Form.Select>
                    </Col>
                    <Col xs={4}>
                        <Form.Control
                            placeholder="Enter keyword..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={() => setApplied({ field, keyword })}>Search</Button>
                    </Col>
                </Row>

                <h5>Subject List</h5>
                <Table bordered hover size="sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Code</th><th>Name</th><th>Curriculum</th><th>Semester</th>
                            <th>Credits</th><th>Pre-requisites</th><th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shown.map((s) => (
                            <tr key={s.id}>
                                <td><Link to={`/subject/${s.id}`}>{s.code}</Link></td>
                                <td>{s.name}</td>
                                <td>{s.curriculum}</td>
                                <td>{s.semester}</td>
                                <td>{s.credits}</td>
                                <td>{s.preRequisites.length ? s.preRequisites.join('; ') : 'None'}</td>
                                <td>{s.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
