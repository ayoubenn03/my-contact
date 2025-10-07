const express = require('express')
const router = express.Router()

const { 
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contact.js')

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
 *           type: string
 *           description: Numéro de téléphone du contact
 *       example:
 *         firstName: Jean
 *         lastName: Dupont
 *         phone: "+33 6 12 34 56 78"
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
router.get('/', getContacts)

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
router.get('/:contactID', getContact)

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', createContact)

/**
 * @swagger
 * /contacts/{contactID}:
 *   put:
 *     summary: Mettre à jour un contact existant
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: contactID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *       404:
 *         description: Contact non trouvé
 */
router.put('/:contactID', updateContact)

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
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 */
router.delete('/:contactID', deleteContact)

module.exports = router
