import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./HeaderComponent";
import EmployeeListComponent from "./EmployeeListComponent";
import FooterComponent from "./FooterComponent";
import EmployeeDetailComponent from "./EmployeeDetailComponent";

const EmployeeManagementComponent = () => {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={EmployeeListComponent} />
                        <Route path="/employees" component={EmployeeListComponent}/>
                        <Route path="/employee-detail/:id" component={EmployeeDetailComponent}/>
                    </Switch>
                </div>
                <FooterComponent/>
            </Router>
        </div>
    );
}

export default EmployeeManagementComponent;