import Employee from "../models/employee";
import EmployeeListResponse from "../models/employeeListResponse";
import EmployeeRequest from "../models/employeeRequest";
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
        const employeeResponse = new EmployeeListResponse(data.employees
            .map((e: any) =>
                new Employee(
                    {
                        _id: e.id,
                        _firstName: e.firstName,
                        _lastName: e.lastName,
                        _salary: e.salary,
                        _createdAt: e.createdAt,
                        _updatedAt: e.updatedAt
                    }
                )
            )
        );

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

        const employeeResponse = new EmployeeResponse(
            new Employee(
                {
                    _id: data.employee.id,
                    _firstName: data.employee.firstName,
                    _lastName: data.employee.lastName,
                    _salary: data.employee.salary,
                    _createdAt: data.employee.createdAt,
                    _updatedAt: data.employee.updatedAt
                })
        );

        return employeeResponse;
    }

    async createEmployee(employee: Employee): Promise<EmployeeResponse> {
        const specs = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new EmployeeRequest(employee))
        };

        const response = await fetch(this.route, specs);
        const data = await response.json();

        const employeeResponse = new EmployeeResponse(
            new Employee(
                {
                    _id: data.employee.id,
                    _firstName: data.employee.firstName,
                    _lastName: data.employee.lastName,
                    _salary: data.employee.salary,
                    _createdAt: data.employee.createdAt,
                    _updatedAt: data.employee.updatedAt
                })
        );

        return employeeResponse;

    }

    async deleteEmployee(id: string) {
        const specs = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const url = `${this.route}/${id}`
        await fetch(url, specs);
    }

    async updateEmployee(id: string, employee: Employee): Promise<EmployeeResponse> {
        const specs = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new EmployeeRequest(employee))
        };
        const url = `${this.route}/${id}`
        const response = await fetch(url, specs);

        const data = await response.json();

        const employeeResponse = new EmployeeResponse(
            new Employee(
                {
                    _id: data.employee.id,
                    _firstName: data.employee.firstName,
                    _lastName: data.employee.lastName,
                    _salary: data.employee.salary,
                    _createdAt: data.employee.createdAt,
                    _updatedAt: data.employee.updatedAt
                })
        );

        return employeeResponse;

    }

}

export default EmployeeService;