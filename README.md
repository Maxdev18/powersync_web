# PowerSync Web Version
PowerSync is a ficticious company that sells its own IoT products. These IoT devices can then be linked to PowerSync either through the Web or through the app. This repository contains all the code for the web version of PowerSync. This project is more dependant on backend services for all the different CRUD operations. You may clone and play around with the codebase however you want.

### 1. Cloning the project
To clone the project, first open a terminal and go to a directory of your choice. Then run the command `git clone https://github.com/Maxdev18/powersync_web.git`. Then go inside the repository by running `cd powersync_web`.

### 2. Installing dependencies
After cloning the repository, you need to install all the necessary dependencies that the project utilizes. Since this project uses npm, run the command `npm install`. It's important to note that these dependencies are only for the backend. The frontend is contained in it's own separate directory with it's own dependencies which you may install next.

Now go inside the `frontend` directory by doing `cd frontend` and then install all the necessary dependecies by runnning `npm install`.

### 3. Running the application
To start the application, you need to exit the fronend directory and run the script from the root directory of the project. Run `cd ..` to go one directory level up and run `npm run start-dev` to start the frontend and backend servers. Navigate to `localhost:3000` to see the frontend and `localhost:8080` to see the backend with a message that says `This is the backend server`.