import Employee from "../models/employee";
import EmployeeResponse from "../models/employeeResponse";

class EmployeeService {
    _route: string

    constructor() {
        this._route = `${process.env.REACT_APP_API_URL}/employees`;
    }

    async getEmployees() {
        const specs = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(this._route, specs);

        return response.json();
    }

}

export default EmployeeService;