class Employee {
    constructor(name, id, role, email) {
        this.name = name;
        this.id = id;
        this.role = role;
        this.email = email;
    }
};


//Employees DATA
const employees = [];

let bob = new Employee("bob", 1, "engineer", "bob@website.com");

const getName = (employee) =>{
    return console.log(employee.name);
};
const getId = (employee) =>{
    return console.log(employee.id);
};
const getRole = (employee) =>{
    return console.log(employee.role);
};
const getEmail = (employee) =>{
    return console.log(employee.email);
};

console.log(bob);
getName(bob);
getId(bob);
getRole(bob);
getEmail(bob);
