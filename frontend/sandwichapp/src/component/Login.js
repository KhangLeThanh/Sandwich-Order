import React, { Component } from 'react';
import axios from 'axios';

class Sandwich extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        error: null
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (evt) {
      this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit(event) {
      event.preventDefault();
      axios.post('/v1/user/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.setState({error: ""});
        this.props.history.push('/sandwich');
      })
      .catch((error) => {
        if (error.response.data) {
          this.setState({error: error.response.data.error});
        } else {
          this.setState({error: error.response.statusText});
        }
      });
    }

    render(){
        return(
            <div className="login-page">
              <form className="login-container" onSubmit={this.handleSubmit}>
                <h4>Sandwich App - LogIn</h4>
                <hr/>
                <h5 className="error-message">{this.state.error}</h5>
                <div className="form-group">
                  <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username..." className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password..." className="form-control" />
                </div>
                <div className="form-group">
                  <input type="submit" className="form-control btn btn-primary" value="Submit" />
                </div>
              </form>
            </div>
        );
    }
}
export default Sandwich;
