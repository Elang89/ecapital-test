class Employee {
    id: string;
    firstName: string;
    lastName: string;
    salary: number;
    createdAt: string;
    updatedAt: string | undefined;

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
                _updatedAt?: string
            }) {
        this.id = _id;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.salary = _salary;
        this.createdAt = _createdAt;
        this.updatedAt = _updatedAt;
    }
}

export default Employee;