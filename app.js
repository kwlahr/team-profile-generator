const inquirer = require("inquirer");
const jest = require("jest");
const fs = require("fs");
const express = require("express");
const path = require("path");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
var pdf = require("html-pdf");
var options = {
  format: "Letter"
};

//Module Imports
const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const generateHTML = require("./output/generateHTML");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Employees DATA
const employees = [];
const engineers = [];
const interns = [];
const managers = [];
let id = 0;
var response;

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name:",
        name: "name"
      },
      {
        type: "input",
        message: "Email:",
        name: "email"
      },
      {
        type: "list",
        name: "role",
        message: "What's Your Position At The Company?",
        choices: ["Manager", "Engineer", "Intern"]
      }
    ])
    .then(function(data) {
      let id = 0;
      id = id + 1;
      switch (data.role) {
        case "Manager":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Enter office number: ",
                name: "office"
              }
            ])
            .then(function(res) {
              const officeNum = res.office;
              const manager = new Manager(
                data.name,
                data.id,
                data.email,
                officeNum,
                "Manager"
              );
              employees.push(manager);
            }).then(function(){
              addNext()
              });
          break;
        case "Engineer":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Enter github username: ",
                name: "github"
              }
            ])
            .then(function(res) {
              const githubName = res.github;
              const engineer = new Engineer(
                data.name,
                data.id,
                data.email,
                githubName,
                "Engineer"
              );
              employees.push(engineer);
            }).then(function(){
              addNext()
              });
          break;
        case "Intern":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Enter school: ",
                name: "school"
              }
            ])
            .then(function(res) {
              const internSchool = res.school;
              const intern = new Intern(
                data.name,
                data.id,
                data.email,
                internSchool,
                "Intern"
              );
              employees.push(intern);
            }).then(function(){
              addNext()
              });
          break;
      }
    })
    .then(function() {
    });
};

const addNext = () => {
  inquirer
    .prompt([
      {
        type: "list",
      name: "add",
      message: "Would You Like To Add Another Employee?",
      choices: ["Yes", "No"]
      }
    ])
    .then(function(res) {
      if (res.add === "Yes") {
        promptUser();
      } else {
        console.log("Done");
        completedRoster(employees);
      }
    });
};

async function completedRoster(employees){
    console.log("Success!");
    console.log(employees);
    const html = await generateHTML(employees);
    writeFileAsync("./output/employees.html", html);
}

function init(){
  console.log("Please enter employee info")
  promptUser();
}

init();

// require("./output/employees.html")(app);

app.listen(PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
});