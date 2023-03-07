const Employee = require("./Employee");

// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

// the Intern class extends the Employee class with specific key-value pairs for Intern objects
class Intern extends Employee {
  constructor (name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.role = "Intern";
  }
  getSchool() {
    return this.school;
  };
  getRole() {
    return this.role;
  };
}

module.exports = Intern;