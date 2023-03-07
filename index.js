const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const inquirer =require ("inquirer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

class Generator {

  constructor() {
    this.manager = [];
    this.engineers = [];
    this.interns = [];
    this.team = [];
    this.engineersCount = 0;
    this.internsCount = 0;
  }

  init() {
    this.addTeamManager();
  }

  addTeamManager() {
    inquirer
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
      .then((answers) => {
        const name = answers.managerName;
        const id = answers.managerID;
        const email = answers.managerEmail;
        const number = answers.managerOfficeNumber;
        const manager = [name, id, email, number];
        this.manager = manager;
        this.addMore();
      });
  };

  addMore() {
    inquirer
      .prompt([
        {
          type: 'list',
          choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
          name: 'userChoice',
          message: 'Select an Option:'
        }
      ])
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

  addEngineer() {
    inquirer
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
      .then((answers) => {
        const name = answers.engineerName;
        const id = answers.engineerID;
        const email = answers.engineerEmail;
        const git = answers.engineerGithub;
        const count = this.engineersCount;
        const engineer = [name, id, email, git];
        this.engineers[count] = engineer;
        this.engineersCount++
        
        this.addMore();
      });
  };

  addIntern() {
    inquirer
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
      .then((answers) => {
        const name = answers.internName;
        const id = answers.internID;
        const email = answers.internEmail;
        const school = answers.internSchool;
        const count = this.internsCount;
        const intern = [name, id, email, school];
        this.interns[count] = intern;
        this.internsCount++
        this.addMore();
      });
  };

  generateHTML() {
    const manager = this.manager;
    const engineers = this.engineers;
    const interns = this.interns;
    
    // const teamHTML = render(this.team);
    // console.log(teamHTML);
  };

};

// const newManager = new Manager('Joe Bloggs', 1, 'test@test.com', 101);
// let managerName = newManager.getName();
// console.log(newManager);
// console.log(managerName);

const generate = new Generator();

generate.init();