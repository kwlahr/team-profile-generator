const inquirer = require("inquirer");
const jest = require("jest");
const fs = require("fs");
const express = require("express");
const path = require("path");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
var pdf = require('html-pdf');
var options = {
    format: 'Letter'
};

//Module Imports
const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Employees DATA
const employees = [];


function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            text: "Enter employee name"
        },
        {
            type: "input",
            name: "id",
            text: "Enter employee ID"
        },
        {
            type: "input",
            name: "email",
            text: "Enter employee email"
        },
        {
            type: "input",
            name: "role",
            text: "Enter employee role"
        }
    ]);
};

promptUser();