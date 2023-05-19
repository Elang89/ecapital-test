import Employee from "../models/employee";
import EmployeeListResponse from "../models/employeeListResponse";
import EmployeeResponse from "../models/employeeResponse";

class EmployeeService {
    route: string

    constructor() {
        this.route = `${process.env.REACT_APP_API_URL}/employees`;
    }

    async getEmployees(): Promise<EmployeeListResponse> {

        const specs = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(this.route, specs);
        const data = await response.json();
        const employeeResponse = new EmployeeListResponse(data.employees((e: any) => new Employee(e)));

        console.log(employeeResponse);

        return employeeResponse;
    }

    async getEmployee(id: string): Promise<EmployeeResponse> {
        const specs = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const url = `${this.route}/${id}`
        const response = await fetch(url, specs);
        const data = await response.json();

        const employeeResponse = new EmployeeResponse(data.employee)

        return employeeResponse;
    }

}

export default EmployeeService;