import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Container, Button, Form } from 'react-bootstrap';
import { API } from '../config';

export default function SubjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [pre, setPre] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        axios.get(`${API}/subjects/${id}`).then((r) => {
            setForm(r.data);
            setPre(r.data.preRequisites.join(', '));
        });
    }, [id]);

    if (!form) return null;

    const change = (key) => (e) => setForm({ ...form, [key]: e.target.value });

    const toggle = async () => {
        if (!editing) {
            setEditing(true);
            return;
        }
        const data = {
            ...form,
            semester: Number(form.semester),
            credits: Number(form.credits),
            preRequisites: pre.split(',').map((x) => x.trim()).filter(Boolean),
        };
        await axios.put(`${API}/subjects/${id}`, data);
        setForm(data);
        setEditing(false);
        alert('Saved successfully');
    };

    const remove = async () => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            await axios.delete(`${API}/subjects/${id}`);
            navigate('/syllabus');
        }
    };

    return (
        <>
            <Navbar bg="secondary" variant="dark" className="px-3">
                <Navbar.Brand>Subject Detail Management</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Button size="sm" variant="light" onClick={() => navigate('/syllabus')}>Back to List</Button>
                </Navbar.Collapse>
            </Navbar>

            <Container style={{ maxWidth: 600 }} className="mt-4">
                <h3>Subject Information</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Code</Form.Label>
                        <Form.Control value={form.code} readOnly={!editing} onChange={change('code')} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={form.name} readOnly={!editing} onChange={change('name')} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Curriculum</Form.Label>
                        <Form.Control value={form.curriculum} readOnly={!editing} onChange={change('curriculum')} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control type="number" value={form.semester} readOnly={!editing} onChange={change('semester')} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Credits</Form.Label>
                        <Form.Control type="number" value={form.credits} readOnly={!editing} onChange={change('credits')} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pre-requisites (cách nhau bởi dấu phẩy)</Form.Label>
                        <Form.Control value={pre} readOnly={!editing} onChange={(e) => setPre(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={form.description} readOnly={!editing} onChange={change('description')} />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={toggle}>{editing ? 'Save' : 'Edit'}</Button>
                        <Button variant="secondary" onClick={remove}>Delete</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}
