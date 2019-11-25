import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import sha256 from 'sha256';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import Loader from '../Loader';
import { validPattern } from '../../utils/configConst';
import { capitalize } from '../../utils/generalUtils';
import { Router, Link } from '../../routes';

const CREATE_USER = gql`
  mutation($userInput: CreateUserInput!) {
    createUser(data: $userInput) {
      result
      token
      user {
        id
        name
      }
    }
  }
`;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      hasEmailError: false,
      hasPasswordError: false,
      hasConfirmPasswordError: false,
      hasUsernameError: false,

      emailErrorType: '',
      passwordErrorType: '',
      usernameErrorType: '',
      confirmPasswordErrorType: '',

      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      isButtonActive: false,
    };
    this.wrapperRef = React.createRef();
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
    this.handleRegist = this.handleRegist.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.doValidate = this.doValidate.bind(this);
    this.handleEmailExist = this.handleEmailExist.bind(this);
    this.handleUsernameExist = this.handleUsernameExist.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.doRegist = this.doRegist.bind(this);
    this.checkAllInputValid = this.checkAllInputValid.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.wrapperRef.current) return;
    if (!this.wrapperRef.current.contains(event.target)) {
      document.removeEventListener('mousedown', this.handleClickOutside);
      this.props.toggleSignupForm();
    }
  }

  handleEmailExist() {
    this.setState({
      hasEmailError: true,
      emailErrorType: 'email_exist',
    });
  }

  handleUsernameExist() {
    this.setState({
      hasUsernameError: true,
      usernameErrorType: 'username_exist',
    });
  }

  async doRegist(client) {
    const userInput = {
      userName: this.state.username,
      email: this.state.email,
      password: sha256(this.state.password),
    };
    this.setState({ isLoading: true });
    const { data } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        userInput,
      },
    });

    const { createUser } = data;
    const { result, token, user } = createUser;

    if (result !== 'success') {
      alert('Username has been used');
    } else {
      localStorage.setItem('token', token);
      if (user) {
        const { id, name } = user;
        localStorage.setItem('userId', id);
        localStorage.setItem('username', name);
      }
      window.location = `/profile?userId=${localStorage.getItem('userId')}`;
    }
    this.setState({ isLoading: false });
  }

  checkAllInputValid() {
    let isValid = true;
    ['email', 'password', 'confirmPassword', 'username'].forEach(type => {
      if (!this.doValidate(type)) {
        isValid = false;
      }
    });
    return isValid;
  }

  handleRegist(client) {
    if (this.checkAllInputValid()) this.doRegist(client);
  }

  checkInputDone() {
    const fields = ['email', 'password', 'confirmPassword', 'username'];
    let result = true;
    for (let i = 0; i < fields.length; i++) {
      if (
        !this.state[fields[i]] ||
        this.state[`has${capitalize(fields[i])}Error`]
      ) {
        result = false;
        break;
      }
    }
    return result;
  }

  checkConfirmPassword() {
    if (this.state.password === this.state.confirmPassword) {
      this.setState({
        hasConfirmPasswordError: false,
      });
      return true;
    }
    if (this.state.confirmPassword.length !== 0) {
      this.setState({
        hasConfirmPasswordError: true,
        confirmPasswordErrorType: 'The password is inconsistent.',
      });
      return false;
    }
    this.setState({
      hasConfirmPasswordError: false,
    });
    return true;
  }

  handleInputOnChange({ target }) {
    const { value } = target;
    const { name } = target.dataset;
    this.setState({
      [name]: value,
    });
  }

  doValidate(type) {
    const value = this.state[type];
    if (value) {
      switch (type) {
        case 'email':
          if (!validPattern.emailPattern.test(value)) {
            this.setState({
              hasEmailError: true,
              emailErrorType: 'This email format is invalid.',
            });
          } else {
            this.setState({
              hasEmailError: false,
              emailErrorType: '',
            });
            return true;
          }
          break;
        case 'password':
          this.checkConfirmPassword();
          if (value.length < 8) {
            this.setState({
              hasPasswordError: true,
              passwordErrorType:
                'Your password should be at least 8 characters long.',
            });
          } else if (value.length > 20) {
            this.setState({
              hasPasswordError: true,
              passwordErrorType:
                'Your password should be less than 20 characters.',
            });
          } else {
            this.setState({
              hasPasswordError: false,
              passwordErrorType: '',
            });
            return true;
          }
          break;
        case 'confirmPassword':
          return this.checkConfirmPassword();
        case 'username':
          if (!validPattern.usernamePattern.test(value)) {
            this.setState({
              hasUsernameError: true,
              usernameErrorType:
                'Username only supported alphabet, number, underline.',
            });
          } else if (value.length > 20) {
            this.setState({
              hasUsernameError: true,
              usernameErrorType:
                'Your username should be less than 20 characters.',
            });
          } else {
            this.setState({
              hasUsernameError: false,
              usernameErrorType: '',
            });
            return true;
          }
          break;
        default:
          return true;
      }
    } else {
      const errorInputField = `has${capitalize(type)}Error`;
      const errorInputType = `${type}ErrorType`;
      this.setState({ [errorInputField]: false, [errorInputType]: '' });
    }
    return false;
  }

  handleInputOnBlur({ target }) {
    const type = target.dataset.name;
    this.doValidate(type);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' && !this.state.isButtonActive) {
      e.preventDefault();
      this.setState({ isButtonActive: true });
    }
  }

  handleKeyUp(e) {
    if (e.key === 'Enter' && this.state.isButtonActive) {
      this.setState({ isButtonActive: false });
      // this.handleRegist(e);
    }
  }

  renderInputField(type) {
    const inputStyle = cx(
      {
        'border-red-500 border-b border-solid': this.state[
          `has${capitalize(type)}Error`
        ],
      },
      ['shadow w-full p-4'],
    );
    return (
      <div className="mb-4 w-full">
        <input
          type={type === 'confirmPassword' ? 'password' : type}
          className={inputStyle}
          placeholder={type}
          data-name={type}
          value={this.state[type]}
          onChange={this.handleInputOnChange}
          onBlur={this.handleInputOnBlur}
        />
        <div className="mt-1">
          {this.state[`has${capitalize(type)}Error`]
            ? this.state[`${type}ErrorType`]
            : ''}
        </div>
      </div>
    );
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div className="fixed w-full h-full flex items-center justify-around bg-black-75 z-50">
            <div
              ref={this.wrapperRef}
              id="signup"
              className="flex flex-col items-center mt-20 border bg-white px-16 py-8 rounded w-128">
              {this.state.isLoading && <Loader />}
              <div className="text-xl mb-8">
                Register to Share Your Music and Story
              </div>
              <form
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                className="w-full">
                {this.renderInputField('email')}
                {this.renderInputField('password')}
                {this.renderInputField('confirmPassword')}
                {this.renderInputField('username')}
              </form>
              <div className="mt-8 border px-4 py-4 rounded cursor-pointer">
                <span
                  className={
                    this.checkInputDone() ? 'text-gray' : 'text-gray-500'
                  }
                  onClick={() => {
                    this.handleRegist(client);
                  }}>
                  Create Account
                </span>
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Signup;
