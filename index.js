const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const inquirer = require ("inquirer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// array to store employee objects
const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
class Generator {

// init method to initiate app and call addTeamManager method
  init() {
    this.addTeamManager();
  }

// addTeamManager calls inquirer .prompt
  addTeamManager() {
    inquirer
// .prompt asks manager related questions
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "What is the Team Manager's name?",
        },
        {
          type: 'input',
          name: 'managerID',
          message: "What is the Team Manager's Employee ID?",
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: "What is the Team Manager's email address?",
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: "What is the Team Manager's Office Number?",
        },
      ])
// .then takes the user response inputs and creates a new Manager object
// and pushes the Manager object to the team array
// the addMore method is then called
      .then((answers) => {
        const name = answers.managerName;
        const id = answers.managerID;
        const email = answers.managerEmail;
        const number = answers.managerOfficeNumber;
        const manager = new Manager(name, id, email, number);
        team.push(manager);
        this.addMore();
      });
  };

// addMore calls inquirer .prompt
  addMore() {
    inquirer
// .prompt asks the user to choose an option to proceed
      .prompt([
        {
          type: 'list',
          choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
          name: 'userChoice',
          message: 'Select an Option:'
        }
      ])
// .then contains a switch statement to call the appropriate method
      .then((answers) => {
        switch (answers.userChoice) {
          case 'Add an engineer':
            this.addEngineer();
            break;
          case 'Add an intern':
            this.addIntern();
            break;
          case 'Finish building the team':
            this.generateHTML();
            break;
          default:
            console.log('Error: No choice Detected.');
            break;
        }
      })
  };

// addEngineer calls inquirer .prompt
  addEngineer() {
    inquirer
// .prompt asks engineer related questions
      .prompt([
        {
          type: 'input',
          name: 'engineerName',
          message: "What is the Engineer's name?",
        },
        {
          type: 'input',
          name: 'engineerID',
          message: "What is the Engineer's Employee ID?",
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: "What is the Engineer's email address?",
        },
        {
          type: 'input',
          name: 'engineerGithub',
          message: "What is the Engineer's GitHub username?",
        },
      ])
// .then takes the user response inputs and creates a new Engineer object
// and pushes the Engineer object to the team array
// the addMore method is then called
      .then((answers) => {
        const name = answers.engineerName;
        const id = answers.engineerID;
        const email = answers.engineerEmail;
        const git = answers.engineerGithub;
        const count = this.engineersCount;
        const engineer = new Engineer(name, id, email, git);
        team.push(engineer);
        this.addMore();
      });
  };

// addIntern calls inquirer .prompt
  addIntern() {
    inquirer
// .prompt asks intern related questions
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: "What is the Intern's name?",
        },
        {
          type: 'input',
          name: 'internID',
          message: "What is the Intern's Employee ID?",
        },
        {
          type: 'input',
          name: 'internEmail',
          message: "What is the Intern's email address?",
        },
        {
          type: 'input',
          name: 'internSchool',
          message: "What is the name of the Intern's school?",
        },
      ])
// .then takes the user response inputs and creates a new Intern object
// and pushes the Intern object to the team array
// the addMore method is then called
      .then((answers) => {
        const name = answers.internName;
        const id = answers.internID;
        const email = answers.internEmail;
        const school = answers.internSchool;
        const intern = new Intern(name, id, email, school);
        team.push(intern);
        this.addMore();
      });
  };

// generateHTML uses the fs.writeFile method to create a new HTML file
// the first argument is the save path, the second calls the render method
// this passes the team array to the page-template.js file and internal methods
// to produce the output file
  generateHTML() {
    fs.writeFile(outputPath, render(team), function() {
      console.log("HTML File Created Successfully!");
    });
  };
};

// a new Generator object is created to invoke the app
const generate = new Generator();

// generate.init initiates the app as above
generate.init();