import Employee from "./employee";

class EmployeeListResponse {
    employees: Array<Employee>

    constructor(_employees: Array<Employee>) {
        this.employees = _employees;
    }
}

export default EmployeeListResponse;