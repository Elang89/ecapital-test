import React from "react";
import Grid from "@mui/material/Grid";
import Table from "../Common/Table";
import { Observer } from "mobx-react";


function EmployeePage() {
    return <Observer>{() => {
        return (
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={8} md={8}>
                    <Table></Table>
                </Grid>
            </Grid>
        );
    }}</Observer>
}

export default EmployeePage;