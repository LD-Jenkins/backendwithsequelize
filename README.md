Sample backend setup for an e-commerce application using Node.js, Express.js and Sequelize.

# Project Description

This project covers all of the backend components for an e-commerce application where products, categories of products, and tags (such as "blue" or "large" for a t-shirt) can be added, updated, deleted and retrieved through a relational database.

The project uses Express.js for handling requests/responses, Sequelize/MySQL2 for database handling and their model system to set up tables and relational data systems, and Dotenv to keep sensitive project information secure.

# Setup/Installation

## Local

First start by making sure all project files have been downloaded and dependencies installed. A sample .env file has been included as ".env.EXAMPLE". Rename this to ".env" and updated the username and password variables to your credentials.

## Heroku

This project is also ready for deployment to Heroku using the JAWSDB add-on.


# Usage Instructions

Once that's all set up, the database can be initialized and a connection established by running "node server.js" in your terminal.

Seed files have been provided if you would like to start with seeded data in your database. To run this first end your current connection via the terminal then run "node ./seeds/index.js". Once that's finished re-run "node server.js". If you want to use the seed data and have not yet run the server file, a schema file is provided in the "db" folder that can be queried in MySQL to create the database and set it to be used.

# Testing

This application does not have a front end so request testing can be done through software such as Insomnia Core.

<a href="https://drive.google.com/file/d/18nwESwY-I2bzgCza1B5uPwI-p2bPu2lt/view">Link to Google Drive video of the project in action.</a>