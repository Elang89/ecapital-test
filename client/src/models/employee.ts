import moment, { Moment } from "moment";

class Employee {
    id: string;
    firstName: string;
    lastName: string;
    salary: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        {
            _id,
            _firstName,
            _lastName,
            _salary,
            _createdAt,
            _updatedAt
        }:
            {
                _id: string,
                _firstName: string,
                _lastName: string,
                _salary: number,
                _createdAt: string,
                _updatedAt: string
            }) {
        this.id = _id;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.salary = _salary;
        this.createdAt = moment(_createdAt).toDate();
        this.updatedAt = moment(_updatedAt).toDate();
    }

    converToObj(): { id: string, firstName: string, lastName: string, salary: number, createdAt: Date, updatedAt: Date } {

        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            salary: this.salary,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export default Employee;