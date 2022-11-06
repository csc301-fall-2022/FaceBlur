import request from 'supertest';

import app from '../src/app';
import { logger } from '../src/utils/logger';

describe('registration success', () => {
    test('register a user', async () => {
        const user = {
            id: 1,
            email: 'test@gmail.com',
            password:
                '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        };
        const res = await request(app).post('/api/auth/register').send(user);
        // response check
        expect(res.body).toEqual({ status: 'succeeded' });
        expect(res.statusCode).toBe(200);
        return res;
    });
});

describe('registration fail', () => {
    test('duplicate users', async () => {
        const user1 = {
            id: 1,
            email: 'test@gmail.com',
            password:
                '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        };
        const user2 = {
            id: 2,
            email: 'test@gmail.com',
            password:
                '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        };
        await request(app).post('/api/auth/register').send(user1);
        const res = await request(app).post('/api/auth/register').send(user2);
        // response check
        expect(res.body).toEqual({ message: 'Email In Use', status: 'failed' });
        expect(res.statusCode).toBe(500);
        return res;
    });
});

describe('login success', () => {
    test('login a user', async () => {
        const userReg = {
            id: 1,
            email: 'test@gmail.com',
            password:
                '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        };
        const user = {
            email: 'test@gmail.com',
            password:
                '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        };
        await request(app).post('/api/auth/register').send(userReg);
        const res = await request(app).post('/api/auth/login').send(user);
        // response check
        expect(res.body).toEqual({ status: 'success' });
        expect(res.statusCode).toBe(200);
        return res;
    });
});
