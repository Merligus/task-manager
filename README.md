# task-manager
Simple REST API using Node.js. Using Express to route and MongoDB with Mongoose to register data on the database, the API is able to:

- Sign up a new user
- Log in and log out an existing user
- Keep the user authenticated
- Log out of all authenticated tokens of an existing user
- Update and delete the user
- Upload and delete images related to the user on the database
- Create, get, update and delete a task related to an user

With all these features beeing tested using Jest. The app is also available at [merligus-task-manager.herokuapp.com](https://merligus-task-manager.herokuapp.com) but you can install in your machine following the next steps:

1. Clone the repository
   ```sh
   git clone https://github.com/Merligus/task-manager.git
   cd task-manager/
   ```
2. Initiate MongoDB database at MongoDB/mongodb/bin with:
   ```sh
   .\\mongod.exe --dbpath=/MongoDB/mongodb-data
   ```
3. Install dependencies (considering you already have npm installed)
   ```sh
   npm install
   ```
4. Run the app 
   1. As a developer
      ```sh
      npm run dev
      ```
   2. As an user
      ```sh
      npm run start
      ```
   3. Or run the tests
      ```sh
      npm test
      ```
5. Access the API in your browser at [localhost:3000](http://localhost:3000)

