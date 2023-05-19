import Grid from "@mui/material/Grid";
import EnhancedTable from "../Common/Table/Table";

import { Box } from "@mui/material";
import EmployeeService from "../../services/employeeService";


function EmployeePage() {
    const employeeService = new EmployeeService();


    return (
        <Grid container spacing={0} alignItems="center" justifyContent="center" minHeight="100vh">
            <Grid item xs={12} md={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <EnhancedTable employeeService={employeeService}></EnhancedTable>
                </Box>
            </Grid>
        </Grid>
    );
}

export default EmployeePage;