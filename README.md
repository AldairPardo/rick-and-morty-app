# Rick and Morty API

This is a GraphQL API built with Express that allows searching for Rick and Morty characters. The API supports filtering characters by status, species, gender, name, and origin. Additionally, users can add comments to characters and mark them as favorites. The API is connected to a MySQL relational database using Sequelize and integrates Redis caching for optimized performance.

---

## **Features**

- GraphQL queries for filtering characters by:
  - **Status**: Alive, Dead, or Unknown.
  - **Species**: Alien, Human, etc.
  - **Gender**: Male, Female, or Unknown.
  - **Name**: Partial or exact matches.
  - **Origin**: Filter by character origin.
- Add comments to specific characters.
- Mark characters as favorites.
- Sequelize ORM integration for managing a MySQL database with migrations.
- Redis caching to store search results and improve query performance.

---

## **Technologies Used**

- **Node.js**
- **Express**
- **GraphQL**
- **Apollo**
- **Sequelize**
- **MySQL**
- **Redis**

---

## **Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/AldairPardo/rick-and-morty-app.git
   cd rick-and-morty-app

2. Create the database:
   ```bash
   npx sequelize-cli db:create

3. Run migrations:
   ```bash
   npx sequelize-cli db:migrate

## **Usage**
   ```bash
   npm run start
