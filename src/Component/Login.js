import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './login.css'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accessToken: "",
        }
    }

    componentDidMount() {
        this.responseGoogle()
    }

    responseGoogle = (response) => {
        if (response) {
            const accessToken = response.accessToken
            this.setState({
                accessToken
            })
            localStorage.setItem('token', this.state.accessToken);
            localStorage.setItem('firstname', response.profileObj.givenName)
            this.props.history.push('/download')
        }
        if (localStorage.getItem('firstname') === "ธนพล") {
            this.props.history.push('/download')
        }
        else {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="pageLogin">
                <h1>LOGIN WITH GOOGLE</h1>
                <br />
                <br />
                <GoogleLogin
                    clientId="93654011742-53uq0rfatn6bdvmtqlsq57dteljp3s4g.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    scope="https://www.googleapis.com/auth/dialogflow"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        );
    }
}

export default Login;