import Employee from "./employee";

class EmployeeRequest {
    employee: Employee

    constructor(_employee: Employee) {
        this.employee = _employee;
    }
}

export default EmployeeRequest;