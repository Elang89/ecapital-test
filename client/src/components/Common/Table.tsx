import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


// interface Data {
//     firstName: string,
//     lastName: string,
//     salary: number,
//     createdAt: string,
//     updatedAt: string
// }

function createData(
    firstName: string,
    lastName: string,
    salary: number,
    createdAt: string,
    updatedAt: string
) {
    return { firstName, lastName, salary, createdAt, updatedAt }
}

const rows = [
    createData("William", "Johnson", 42000, "2023-05-18", "None"),
    createData("Mark", "Williams", 90000, "2023-05-18", "None"),
    createData("Adam", "Black", 120000, "2023-05-18", "None"),
    createData("John", "Shepard", 900000, "2023-05-18", "None"),
];

function CustomTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell align="right">Salary&nbsp;($)</TableCell>
                        <TableCell align="right">Date Added</TableCell>
                        <TableCell align="right">Date Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.firstName}>
                            <TableCell component="th" scope="row">
                                {row.firstName}
                            </TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell align="right">{row.salary}</TableCell>
                            <TableCell align="right">{row.createdAt}</TableCell>
                            <TableCell align="right">{row.updatedAt}</TableCell>
                            <TableCell></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;