const mongoose = require('mongoose');
const User = require('../models/User');
const { register, login } = require('../controllers/user');
require('dotenv').config();

beforeAll(async () => {
    const testUri = process.env.MONGO_URI.replace('/?', '/contacts-test?');
    await mongoose.connect(testUri);
}, 30000);

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
}, 30000);

beforeEach(async () => {
    await User.deleteMany({});
});

describe('Auth Controller Tests', () => {
    
    let req, res;
    
    beforeEach(() => {
        req = {
            body: {}
        };
        
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    
    // ==================== Tests register ====================
    
    describe('register', () => {
        
        test('devrait créer un utilisateur avec succès', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'password123'
            };
            
            await register(req, res);
            
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Your account has been registered"
                })
            );
        });
        
        test('devrait rejeter un email déjà utilisé', async () => {
            // Créer un premier utilisateur
            const bcrypt = require('bcrypt');
            const hashedPassword = await bcrypt.hash('password123', 10);
            
            await User.create({
                email: 'test@example.com',
                password: hashedPassword,
                createdAt: new Date()
            });
            
            req.body = {
                email: 'test@example.com',
                password: 'password123'
            };
            
            await register(req, res);
            
            expect(res.status).toHaveBeenCalledWith(400);
        });
        
        test('devrait retourner une erreur pour un email invalide', async () => {
            req.body = {
                email: 'invalid-email',
                password: 'password123'
            };
            
            await register(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    
    // ==================== Tests login ====================
    
    describe('login', () => {
        
        beforeEach(async () => {
            // Créer un utilisateur de test
            req.body = {
                email: 'test@example.com',
                password: 'password123'
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            await register(req, res);
        });
        
        test('devrait se connecter avec succès', async () => {
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            
            req.body = {
                email: 'test@example.com',
                password: 'password123'
            };
            
            await login(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    token: expect.any(String)
                })
            );
        });
        
        test('devrait rejeter un mauvais mot de passe', async () => {
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            
            req.body = {
                email: 'test@example.com',
                password: 'wrongpassword'
            };
            
            await login(req, res);
            
            expect(res.status).toHaveBeenCalledWith(401);
        });
        
        test('devrait rejeter un email inexistant', async () => {
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            
            req.body = {
                email: 'nonexistent@example.com',
                password: 'password123'
            };
            
            await login(req, res);
            
            expect(res.status).toHaveBeenCalledWith(401);
        });
    });
});