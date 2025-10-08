# Cloner le projet

git clone (https://github.com/ayoubenn03/my-contact.git)

# Frontend

cd front/mycontact
npm install
npm run dev

# Backend

cd api
npm install
npx nodemon app.js

# Technos

Backend : Node.js, Express, Mongoose, JWT, Swagger

Frontend : React (Vite), React Router, TailwindCSS

# Authentification

Les routes /contacts nécessitent un token JWT dans le header :

Authorization: <token>

# Endpoints

- Utilisateurs /api/users
  Méthode Route Description
  POST /register Inscription
  POST /login Connexion (retourne un token JWT)

- Contacts /api/contacts
  Méthode Route Description
  GET / Liste des contacts
  GET /:contactID Détail d’un contact
  POST / Ajouter un contact
  PATCH /:contactID Modifier un contact
  DELETE /:contactID Supprimer un contact

# Swagger

La documentation API est disponible sur :
👉 http://localhost:3000/api-docs
