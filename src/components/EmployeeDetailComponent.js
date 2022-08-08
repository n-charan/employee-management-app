import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class EmployeeDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: ''
        }
    }
    componentDidMount() {
        let employeeId = this.state.id;
        if (employeeId == -1) {
            return;
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email
                })
            });
        }
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email}
        console.log("employee ===> " + JSON.stringify(employee));
       if (this.state.id == -1) {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push("/employees");
            })
        } else {
            EmployeeService.updateEmployee(this.state.id, employee).then(res => {
                this.props.history.push("/employees");
            })
       }
    }
    cancel = () => {
        this.props.history.push('/employees');
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add/Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name : </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name : </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address : </label>
                                        <input placeholder="Email Address" name="email" className="form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default EmployeeDetailComponent;