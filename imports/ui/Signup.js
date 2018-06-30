import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Accounts } from 'meteor/accounts-base';

export class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        if(password.length < 5){
            return this.setState({error: 'Password must be greater than 8 characters long'});
        }

        this.props.createUser({email, password}, (err) => {
            if(err){
                console.log();
                this.setState({error: err.reason});
            }else {
                this.setState({error: ''});
            }
        });
    }

    render() {
      return (
          <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Join</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form"> 
                    <input type="email" ref="email" name="email" placeholder="Email"/>
                    <input type="password" ref="password" name="password" placeholder="Password"/>
                    <button className="button">Create Account</button>
                </form>
                <Link to="/">Already Have an account</Link>
            </div>
          </div>
      )
    };
  }

    Signup.propTypes = {
        createUser: PropTypes.func.isRequired
    }
  
  export default withTracker(() => {
    return {
        createUser: Accounts.createUser
    }  
  })(Signup)