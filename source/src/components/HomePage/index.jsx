import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginPage from "../LoginPage";
import UserProfile from "../UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { setcurrentLoggedUser, currentLoggedUser } from '../../features/counter/Global';
import { setisLogged, isLogged } from "../../features/counter/Global";
import store from "../../app/store";




const Users = props => (
  <tr>
    <td>{props.user.Name}</td>
    <td>{props.user.FamilyName}</td>
    <td>{props.user.Email}</td>
    <td>{props.user.Password}</td>
    <td>
      <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
    </td>
  </tr>
)

export default class HomePage extends Component {
  
  constructor(props) {
    super(props);
    
    this.deleteUser = this.deleteUser.bind(this)
    this.state = {users: []};
  }
  getUser = () =>{
    const currentLoggedUsr =5;//store..currentLoggedUser;
    return currentLoggedUsr;
  }
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});
'///'
    this.setState({
        users: this.state.users.filter(el => el._id !== id)
    })
  }

  usersList() {
    return this.state.users.map(currentuser => {
      return <Users user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div style= {{background:"#ffffff"}}>
        <h3>Logged Accounts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name +{localStorage.getItem('name')} </th>
              <th>Family Name {this.getUser()}</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            { this.usersList() }
          </tbody>
        </table>
      </div>
    )
  }
}