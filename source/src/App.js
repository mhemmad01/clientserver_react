import "./App.css";
import React, { useState } from "react";
import { Component } from 'react';

import { Route, Switch, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import UpdatePasswordPage from "./components/UpdatePasswordPage";
import DashboardPage from "./components/DashboardPage";

class App extends Component {
    state = { 
        data : "Hello World"
     }
    render() {
    return (
        <div>
            <BrowserRouter>
                <Switch className='App'>
                    <Route exact path='/' render={() => <HomePage />} callbackFromParents={this.state.data} />
                    <Route exact path='/sign-in' render={() => <LoginPage />} />
                    <Route exact path='/sign-up' render={() => <RegistrationPage />} />
                    <Route exact path='/reset-password' render={() => <ResetPasswordPage />} />
                    <Route exact path='/update-password' render={() => <UpdatePasswordPage />} />
                    <Route exact path='/dashboard' render={() => <DashboardPage />} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
}
export default App;