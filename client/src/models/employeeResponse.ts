import Employee from "./employee";

class EmployeeResponse {
    employee: Employee;

    constructor(_employee: Employee) {
        this.employee = _employee;
    }
}

export default EmployeeResponse;