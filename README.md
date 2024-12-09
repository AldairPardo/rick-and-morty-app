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

2. Install the project dependencies:
   ```bash
   npm install
   # or if you use yarn
   yarn install

3. Create the database:
   ```bash
   npx sequelize-cli db:create

4. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   
## **Prerequisites**  

- **Redis**:  
  The project uses Redis for caching. Ensure you have Redis installed and running locally or accessible on the specified host and port.  

  Default Redis configuration:  
  - **Host**: `localhost`  
  - **Port**: `6379`  

  To install Redis locally, follow the instructions for your operating system:  
  - [Redis Installation Guide](https://redis.io/docs/getting-started/installation/)  

  Start Redis with:  
  ```bash
  redis-server

## **Usage**
   ```bash
   npm run start
