import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import EnhancedTable from "../Common/Table/Table";

import { Box, Button } from "@mui/material";
import Employee from "../../models/employee";
import EmployeeService from "../../services/employeeService";


function EmployeePage() {
    const employeeService = new EmployeeService();
    const [employees, setEmployees] = useState<Employee[]>([]
        // [
        //     new Employee({
        //         _id: "e109f248-6724-4729-b498-fe873372e1b4",
        //         _firstName: "William",
        //         _lastName: "Johnson",
        //         _salary: 42000,
        //         _createdAt: "2023-05-18 20:40:45",
        //         _updatedAt: "None"
        //     }),
        //     new Employee({
        //         _id: "0f81016b-9d71-4218-a2b8-df9f2615c07b",
        //         _firstName: "Mark",
        //         _lastName: "Williams",
        //         _salary: 90000,
        //         _createdAt: "2023-05-18 20:40:45",
        //         _updatedAt: "None"
        //     }),
        // ]
    );

    useEffect(() => {
        const apiCall = async () => {
            const response = await employeeService.getEmployees();
            setEmployees(response.employees);

        }

        apiCall();
    }, []);

    return (
        <Grid container spacing={0} alignItems="center" justifyContent="center" minHeight="100vh">
            <Grid item xs={12} md={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <EnhancedTable employees={employees}></EnhancedTable>
                </Box>
            </Grid>
            {/* <Grid item xs={2} md={2} alignItems="center">
                <Box display="flex" alignItems="flex-end">
                    <Button variant="contained" color="success">
                        Add Employee
                    </Button>
                </Box>
            </Grid> */}
        </Grid>
    );
}

export default EmployeePage;