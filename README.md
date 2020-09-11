# Mypulse challenge

Coding challenge for mypulse

# Environment variables

NODE_ENV=test

PORT=3001

DATABASE_URI=mongodb://localhost:27017/mypulse

# Execution instructions

Full suit of unit tests available with npm run unit-tests

To run intergration tests have a local version of mongoDB running and run: npm run intergration-tests no need to launch the express server as the intergration tests run a local server for each of the questions automatically. 

Logic for question four is missing because I ran out of time, I didn't have access to the YML or JSON file so I inputted the data via the REST API to ensure it would work with larger data sets. Given more time I would write a small script to read in and validate the data to populate the mongoDB database for the tests.  

# My design

I've utilised middlewares to ensure that logic can be changed throughout the program with minimal fuss. I've relied on automated tests to reduce QA effort. The design is entirely RESTful to ensure that it can be used with other technologies. 
