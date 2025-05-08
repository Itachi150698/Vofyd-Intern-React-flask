# Project Setup Guide

This project consists of a **React** frontend and a **Flask** backend, along with a **MySQL** database. Follow the instructions below to set up and run the project locally.

---

## **1. Setting Up the Client (Frontend)**

The frontend of the application is built with **React**. To get started, follow these steps:

### Steps:

1. **Navigate to the Client Folder:**
   Open a terminal and navigate to the `client` folder where the React app is located.

   cd /path/to/your/project/client

2. **Install Dependencies:**
   Run the following command to install all necessary dependencies for the React app.

   npm install

3. **Start the React Development Server:**
   Once the dependencies are installed, run the following command to start the React app.

   npm run dev

4. **Access the React App:**
   After running the above command, you will see a specified link (http://localhost:5173/). Click or visit the link in your browser to view the app.

   ---

## **2. Setting Up the App (Backend - Flask)**

The backend of the application is built with Flask. Follow these steps to set it up:

Steps:

1. **Create a Virtual Environment:**
   Inside the backend folder (e.g., server), create a virtual environment to isolate dependencies and save system space.

For Windows:
Open a terminal and run:

python -m venv .venv

For macOS/Linux:
Open a terminal and run:

python3 -m venv .venv

2. **Activate the Virtual Environment:**
   To activate the virtual environment, run the following command:

For Windows:

.venv\Scripts\activate

For macOS/Linux:

source .venv/bin/activate

3. **Install Dependencies:**
   Once the virtual environment is activated, install the required Python dependencies by running:

pip install -r requirements.txt

4. **Set Up Database (Migrations):**
   After installing dependencies, set up the database schema by running the database migrations.

\*Create Database (if necessary):
First, make sure that MySQL is running on your local machine (refer to the steps in the next section).

\*Run Migrations:
Flask uses Flask-Migrate for handling database migrations. Run the following commands to initialize and migrate the database:

flask db init # Initializes the migrations directory
flask db migrate # Creates a migration script
flask db upgrade # Applies the migration to the database

This will create the necessary tables in the MySQL database according to your model definitions.

4. **Start the Flask Application:**
   Now, you’re ready to run the Flask app. In the terminal, run the following command:

flask run

5. **Access the Flask Backend:**
   After running the Flask app, you'll see a specified link (usually http://127.0.0.1:5000/ or similar). Visit the link to access the backend.

---

## 3. **Setting Up the Database (MySQL)**

The application uses MySQL as the database. You can use MySQL Workbench or XAMPP to set up and run MySQL.

Steps:

1. **Using MySQL Workbench:**

Open MySQL Workbench on your computer.

Ensure the MySQL server is running by clicking the Start button in MySQL Workbench.

Connect to your MySQL server using the credentials you’ve set up.

2. **Using XAMPP:**

If you prefer XAMPP, open the XAMPP Control Panel.

Start both MySQL and Apache.

MySQL will now be running locally, and you can access the database through PHPMyAdmin or a MySQL client.
