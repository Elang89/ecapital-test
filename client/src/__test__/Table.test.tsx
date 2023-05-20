import React from 'react';
import { render, screen } from '@testing-library/react';
import EnhancedTable from '../components/Common/Table/Table';
import EmployeeService from '../services/employeeService';

test("renders a table", () => {
  render(<EnhancedTable employeeService={new EmployeeService} />);
  const tableHeader = screen.getByText(/Employees/i);
  expect(tableHeader).toBeInTheDocument();
});
