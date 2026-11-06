import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { API } from '../config';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.get(`${API}/accounts`, { params: { email, password } });
            const acc = res.data.find((a) => a.email === email && a.password === password);
            if (!acc) {
                setError('Email hoặc mật khẩu không đúng');
                return;
            }
            if (acc.status === 'Inactive') {
                setError('Tài khoản đã bị khóa');
                return;
            }
            localStorage.setItem('user', JSON.stringify(acc));
            navigate('/syllabus');
        } catch {
            setError('Không kết nối được API');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: 400 }} className="p-4 shadow">
                <h3 className="text-center mb-3">Sign In</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="email of student or lecture"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="secondary" className="w-100">Login</Button>
                </Form>
            </Card>
        </Container>
    );
}
