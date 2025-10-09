# My Contact - Application de Gestion de Contacts

Application MyContact est une appli pour le projet fullstackjs permettant de se connecter en tant qu'utilisateur et pouvoir ajouter, consulter, modifier et supprimer des contacts

## 🚀 Installation

### Cloner le projet

```bash
git clone https://github.com/ayoubenn03/my-contact.git
cd my-contact
```

### Frontend

```bash
cd front/mycontact
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Backend

```bash
cd api
npm install
npx nodemon app.js
```

L'API sera accessible sur `http://localhost:3000`

## 🛠️ Technos

**Backend :** Node.js, Express, Mongoose, JWT, Bcrypt, Swagger, Jest

**Frontend :** React (Vite), React Router

**Base de données :** MongoDB Atlas

## 🔐 Authentification

Les routes `/contacts` nécessitent un token JWT dans le header :

```
Authorization: <token>
```

## 📡 Endpoints API

### Utilisateurs `/api/users`

| Méthode | Route       | Description                       |
| ------- | ----------- | --------------------------------- |
| POST    | `/register` | Inscription                       |
| POST    | `/login`    | Connexion (retourne un token JWT) |

### Contacts `/api/contacts`

| Méthode | Route         | Description          |
| ------- | ------------- | -------------------- |
| GET     | `/`           | Liste des contacts   |
| GET     | `/:contactID` | Détail d'un contact  |
| POST    | `/`           | Ajouter un contact   |
| PATCH   | `/:contactID` | Modifier un contact  |
| DELETE  | `/:contactID` | Supprimer un contact |

## 📚 Documentation API (Swagger)

**Local :** http://localhost:3000/api-docs

**Production :** https://my-contact-api-qhsb.onrender.com/api-docs/

## 🧪 Tests

Lancer les tests Jest (backend) :

```bash
cd api
npm test
```

## 👤 Identifiants de test

Pour tester l'application :

- **Email :** test@gmail.com
- **Password :** Test2025

## 🌐 Déploiement

- **Frontend :** https://my-contact-0jar.onrender.com/
- **Backend :** https://my-contact-api-qhsb.onrender.com/api
- **Swagger :** https://my-contact-api-qhsb.onrender.com/api-docs/

## ⚙️ Variables d'environnement

### Backend (`api/.env`)

```env
PORT=3000
MONGO_URI=mongodb+srv://...
```

### Frontend (`front/mycontact/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```
