const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// the Manager class extends the Employee class with specific key-value pairs for Manager objects
class Manager extends Employee {
  constructor (name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role = "Manager";
  };
  getOfficeNumber() {
    return this.officeNumber;
  };
  getRole() {
    return this.role;
  };
}

module.exports = Manager;