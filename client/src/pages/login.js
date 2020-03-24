import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../style/login.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";
// eslint-disabled-next
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',


    };
  }

  validateForm() {
    const { email } = this.state;
    const { password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios.post('/authorisation', {
      email: this.state.email,
      password: this.state.password,

    }).then(res => {
      localStorage.setItem('Bearer ', res.data);
      // let match = useRouteMatch();

      this.props.history.push('/');
    });
  };


  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          Login
          <Form.Group controlId="email" bsSize="large">
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}


export default withRouter(Login);
