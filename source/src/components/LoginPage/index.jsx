import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {useState, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import UserProfile from "../UserProfile";


export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {user: {}, status: "", rememberMe: false} ;
        this.counter = 0;
        this.reCAPTCHAValue=0;
    }
    
    onChange=(value)=> {
        //this.setState({status: "Captcha value:"+ value});
        this.reCAPTCHAValue=value;
    }
   validateLogin=()=> {
    if(this.reCAPTCHAValue==0){
        this.setState({status: "You Must Solve the ReCAPTCHA"});
        return;
    }

    this.setState({status: "Please Wait..."});
        axios.post('http://localhost:5000/users/getuser',{email: this.state.email, password: this.state.password})
          .then(response => {
            var res= JSON.parse(JSON.stringify(response.data));
            this.setState({ user: res });
            this.state.status=this.counter++;
            if(res.Email!=""&&res.Email == this.state.email && res.Password == this.state.password){
                this.setState({user: res,status: "Ok " + res.Name});
                UserProfile.email=res.Email;
                if( this.state.rememberMe){
                    localStorage.setItem('remeberme', 'true');
                    localStorage.setItem('email', res.Email);
                    localStorage.setItem('name', res.Name);
                    localStorage.setItem('familyName', res.FamilyName);
                    localStorage.setItem('password', res.Password);
                }
                else{
                    localStorage.setItem('email', "");
                    localStorage.setItem('password', "");
                }
                window.location.href = 'Dashboard'
            }
            else
                this.setState({user: res,status: "Email Or Password is Incorrect!!!"});
          })
          .catch((error) => {
            this.status="error: " +error
            console.log(error);
          })
          
      }

    handleEmailChange=(e)=> {
        this.setState({email: e.target.value});
     }

    handlePasswordChange=(e)=>{
        this.setState({password: e.target.value});
     }

    handleRememberMeChange=(e)=>{
        this.setState({rememberMe:e.target.checked})
    }

  render() {
  return (
        <div class="container">
                <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <p class="text-danger" name="status" ref="status">{this.state.status}</p>
                                            </div>
                                            <div class="form-group">
                                                <input type="email" name="email" class="form-control form-control-user"
                                                    id="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    value={this.state.email} onChange={this.handleEmailChange}/>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="password" class="form-control form-control-user"
                                                    id="password" placeholder="Password"
                                                    value={this.state.password} onChange={this.handlePasswordChange}/>
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck" onChange={this.handleRememberMeChange}/>
                                                    <label class="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <button type="button" class="btn btn-primary btn-user btn-block" onClick={this.validateLogin}>
                                                Login
                                            </button>
                                            <hr/>
                                            <ReCAPTCHA sitekey="6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe" onChange={this.onChange}/>
                                            {/* <div class="g-recaptcha" data-sitekey="6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe"></div> */}
                                        </form>
                                        <hr/>
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small" href="register.html">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
    
            </div>
    
        </div>

     );
}
}