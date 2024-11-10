import request from 'supertest';
import express from 'express';
import api from './api';
import { registerController } from '../controller/register';

// Mock the register controller function
jest.mock('../controller/register', () => ({
    registerController: jest.fn((req, res) => res.status(201).json({ message: 'User registered successfully' }))
}));

const app = express();
app.use(express.json());
app.use('/', api);

describe('API Routes', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('POST /register', () => {
        it('should call the register controller and respond with 201', async () => {
            const userData = { username: 'testuser', password: 'password123' };

            const response = await request(app)
                .post('/register')
                .send(userData);

            expect(registerController).toHaveBeenCalled();
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'User registered successfully' });
        });

        it('should handle errors in the register controller gracefully', async () => {
            registerController.mockImplementationOnce((req, res) => res.status(500).json({ error: 'Internal server error' }));

            const response = await request(app)
                .post('/register')
                .send({ username: 'errorUser' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal server error' });
        });
    });
});
