const express = require('express');
const router = express.Router();

const { 
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contact.js');
const verifyToken = require('../middleware/user.middleware.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-généré du contact
 *         firstName:
 *           type: string
 *           description: Prénom du contact
 *         lastName:
 *           type: string
 *           description: Nom du contact
 *         phone:
 *           type: number
 *           description: Numéro de téléphone du contact (uniquement chiffres, sans + ni espaces)
 *       example:
 *         firstName: Jean
 *         lastName: Dupont
 *         phone: 612345678
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API pour la gestion des contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupérer la liste de tous les contacts
 *     tags: [Contacts]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: "Token JWT (sans 'Bearer ')"
 *     responses:
 *       200:
 *         description: Liste de contacts récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/',verifyToken, getContacts);

/**
 * @swagger
 * /contacts/{contactID}:
 *   get:
 *     summary: Récupérer un contact par son ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: contactID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à récupérer
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: "Token JWT (sans 'Bearer ')"
 *     responses:
 *       200:
 *         description: Contact trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 */
router.get('/:contactID',verifyToken, getContact);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: "Token JWT (sans 'Bearer ')"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le contact Jean a bien été ajouté"
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Données invalides
 */
router.post('/',verifyToken, createContact);

/**
 * @swagger
 * /contacts/{contactID}:
 *   patch:
 *     summary: Mettre à jour un contact existant
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: contactID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à mettre à jour
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: "Token JWT (sans 'Bearer ')"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le contact Jean a été mis à jour"
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 */
router.patch('/:contactID',verifyToken, updateContact);

/**
 * @swagger
 * /contacts/{contactID}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: contactID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à supprimer
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: "Token JWT (sans 'Bearer ')"
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le contact Jean a été supprimé"
 *       404:
 *         description: Contact non trouvé
 */
router.delete('/:contactID',verifyToken, deleteContact);

module.exports = router;
