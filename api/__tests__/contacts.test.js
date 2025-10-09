const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controllers/contact');
require('dotenv').config();

beforeAll(async () => {
    const testUri = process.env.MONGO_URI.replace('/?', '/contacts-test?');
    await mongoose.connect(testUri);
}, 30000);

afterAll(async () => {
    await Contact.deleteMany({});
    await mongoose.connection.close();
}, 30000);

beforeEach(async () => {
    await Contact.deleteMany({});
});

describe('Contact Controller Tests', () => {
    
    let req, res;
    
    beforeEach(() => {
        req = {
            body: {},
            params: {},
            user: { id: 'user123' }
        };
        
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    
    describe('getContacts', () => {
        
        test('devrait récupérer tous les contacts de l\'utilisateur', async () => {
            await Contact.create([
                { firstName: 'John', lastName: 'Doe', phone: '1111111111', userId: 'user123' },
                { firstName: 'Jane', lastName: 'Smith', phone: '2222222222', userId: 'user123' },
                { firstName: 'Bob', lastName: 'Martin', phone: '3333333333', userId: 'other-user' }
            ]);
            
            await getContacts(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                result: expect.arrayContaining([
                    expect.objectContaining({ firstName: 'John' }),
                    expect.objectContaining({ firstName: 'Jane' })
                ])
            });
        });
        
        test('devrait retourner un tableau vide si aucun contact', async () => {
            await getContacts(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ result: [] });
        });
    });
    
    describe('getContact', () => {
        
        test('devrait récupérer un contact par son ID', async () => {
            const contact = await Contact.create({
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                userId: 'user123'
            });
            
            req.params.contactID = contact._id.toString();
            
            await getContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                result: expect.objectContaining({
                    firstName: 'John',
                    lastName: 'Doe'
                })
            });
        });
        
        test('devrait retourner 404 si le contact n\'existe pas', async () => {
            req.params.contactID = new mongoose.Types.ObjectId().toString();
            
            await getContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
    
    describe('createContact', () => {
        
        test('devrait créer un contact avec succès', async () => {
            req.body = {
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890'
            };
            
            await createContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                result: expect.objectContaining({
                    firstName: 'John',
                    lastName: 'Doe',
                    phone: '1234567890',
                    userId: 'user123'
                })
            });
        });
        
        test('devrait retourner 500 si firstName manque', async () => {
            req.body = {
                lastName: 'Doe',
                phone: '1234567890'
            };
            
            await createContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
        });
        
        test('devrait retourner 500 si phone est trop court', async () => {
            req.body = {
                firstName: 'John',
                lastName: 'Doe',
                phone: '123'
            };
            
            await createContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    
    describe('updateContact', () => {
        
        test('devrait mettre à jour un contact', async () => {
            const contact = await Contact.create({
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                userId: 'user123'
            });
            
            req.params.contactID = contact._id.toString();
            req.body = {
                firstName: 'Johnny',
                phone: '9876543210'
            };
            
            await updateContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Le contact John Doe a bien été modifié'
            });
        });
        
        test('devrait retourner 404 si le contact n\'existe pas', async () => {
            req.params.contactID = new mongoose.Types.ObjectId().toString();
            req.body = {
                firstName: 'Johnny'
            };
            
            await updateContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
        });
        
        test('devrait retourner 403 si l\'utilisateur n\'est pas le propriétaire', async () => {
            const contact = await Contact.create({
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                userId: 'other-user'
            });
            
            req.params.contactID = contact._id.toString();
            req.body = {
                firstName: 'Johnny'
            };
            
            await updateContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(403);
        });
    });
    
    describe('deleteContact', () => {
        
        test('devrait supprimer un contact', async () => {
            const contact = await Contact.create({
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                userId: 'user123'
            });
            
            req.params.contactID = contact._id.toString();
            
            await deleteContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'John Doe a bien été supprimer de vos contacts'
            });
            
            const deletedContact = await Contact.findById(contact._id);
            expect(deletedContact).toBeNull();
        });
        
        test('devrait retourner 404 si le contact n\'existe pas', async () => {
            req.params.contactID = new mongoose.Types.ObjectId().toString();
            
            await deleteContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(404);
        });
        
        test('devrait retourner 403 si l\'utilisateur n\'est pas le propriétaire', async () => {
            const contact = await Contact.create({
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                userId: 'other-user'
            });
            
            req.params.contactID = contact._id.toString();
            
            await deleteContact(req, res);
            
            expect(res.status).toHaveBeenCalledWith(403);
        });
    });
});