import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class EmployeeListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    addEmployee() {
        this.props.history.push(`/employee-detail/-1`);
    }

    editEmployee(id) {
        this.props.history.push(`/employee-detail/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id != id)});
        })
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
           this.setState({employees: res.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button style={{marginBottom: "10px"}} className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.email}</td>
                                            <td>
                                                <button className="btn btn-info" onClick={() => this.editEmployee(employee.id)}>Update</button>
                                                <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={() => this.deleteEmployee(employee.id)}>Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default EmployeeListComponent;