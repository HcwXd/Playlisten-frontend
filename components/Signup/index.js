import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import sha256 from 'sha256';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import Loader from '../Loader';
import { validPattern } from '../../utils/configConst';
import {
  capitalize,
  logEvent,
  setLocalStorageLoginInfo,
} from '../../utils/generalUtils';
import AuthAPI from '../../utils/api/apifetcher/auth';
import { ERROR_TYPE, FIELD_TYPE } from './constants';

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

const CREATE_USER_BY_FACEBOOK = gql`
  mutation($userInput: CreateUserByFacebookInput!) {
    createUserByFacebook(data: $userInput) {
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
      isInitLoading: true,
      isFacebookSignup: false,

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
      facebookId: '',
      facebookAccessToken: '',

      isButtonActive: false,
    };
    this.wrapperRef = React.createRef();
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.doValidate = this.doValidate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.doRegist = this.doRegist.bind(this);
    this.checkAllInputValid = this.checkAllInputValid.bind(this);
    this.renderFacebookSignupForm = this.renderFacebookSignupForm.bind(this);
    this.renderSignupForm = this.renderSignupForm.bind(this);
    this.doRegistByFacebook = this.doRegistByFacebook.bind(this);
  }

  async componentWillMount() {
    const params = new URLSearchParams(window.location.search);
    const isFacebookSignup = params.get('facebook');
    if (isFacebookSignup) {
      this.setState({ isFacebookSignup });
      const { data } = await AuthAPI.getFacebookSignupInfo();
      const { result, user } = data;

      if (result !== 'failed') {
        const { email, facebookAccessToken, facebookId, id, name } = user;
        this.setState({ email, facebookAccessToken, facebookId });
        if (id && name) {
          setLocalStorageLoginInfo({ token: facebookAccessToken, id, name });
          window.location = `/profile?userId=${id}`;
        } else {
          this.setState({ isInitLoading: false });
        }
      }
    } else {
      this.setState({ isInitLoading: false });
    }
  }

  async componentDidMount() {
    if (!this.state.isFacebookSignup) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }

  handleClickOutside(event) {
    if (!this.wrapperRef.current) return;
    if (!this.wrapperRef.current.contains(event.target)) {
      document.removeEventListener('mousedown', this.handleClickOutside);
      if (this.props.toggleSignupForm) {
        this.props.toggleSignupForm();
      } else {
        window.location = '/';
      }
    }
  }

  async doRegistByFacebook(client) {
    if (!this.checkInputDone([FIELD_TYPE.USERNAME])) return;
    const userInput = {
      userName: this.state.username,
      email: this.state.email,
      facebookId: this.state.facebookId,
      facebookAccessToken: this.state.facebookAccessToken,
    };
    this.setState({ isLoading: true });

    const { data } = await client.mutate({
      mutation: CREATE_USER_BY_FACEBOOK,
      variables: {
        userInput,
      },
    });

    const { createUserByFacebook } = data;
    const { result, token, user } = createUserByFacebook;

    if (result !== 'success') {
      alert(ERROR_TYPE.USERNAME_DUPLICATED);
    } else {
      logEvent('user', 'signup');
      if (user) {
        const { id, name } = user;
        setLocalStorageLoginInfo({ token, id, name });
        window.location = `/profile?userId=${id}`;
      }
    }
    this.setState({ isLoading: false });
  }

  async doRegist(client) {
    if (!this.checkAllInputValid()) return;
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
      alert(ERROR_TYPE.USERNAME_DUPLICATED);
    } else {
      logEvent('user', 'signup');
      if (user) {
        const { id, name } = user;
        setLocalStorageLoginInfo({ token, id, name });
        window.location = `/profile?userId=${id}`;
      }
    }
    this.setState({ isLoading: false });
  }

  checkAllInputValid() {
    let isValid = true;
    [
      FIELD_TYPE.EMAIL,
      FIELD_TYPE.PASSWORD,
      FIELD_TYPE.CONFIRM_PASSWORD,
      FIELD_TYPE.USERNAME,
    ].forEach(type => {
      if (!this.doValidate(type)) {
        isValid = false;
      }
    });
    return isValid;
  }

  checkInputDone(
    fields = [
      FIELD_TYPE.EMAIL,
      FIELD_TYPE.PASSWORD,
      FIELD_TYPE.CONFIRM_PASSWORD,
      FIELD_TYPE.USERNAME,
    ],
  ) {
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
        confirmPasswordErrorType: ERROR_TYPE.PASSWORD_INCONSISTENT,
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
        case FIELD_TYPE.EMAIL:
          if (!validPattern.emailPattern.test(value)) {
            this.setState({
              hasEmailError: true,
              emailErrorType: ERROR_TYPE.EMAIL_INVALID,
            });
          } else if (!value.includes('@gmail.com')) {
            this.setState({
              hasEmailError: true,
              emailErrorType: ERROR_TYPE.EMAIL_NOT_GMAIL,
            });
          } else {
            this.setState({
              hasEmailError: false,
              emailErrorType: '',
            });
            return true;
          }
          break;
        case FIELD_TYPE.PASSWORD:
          this.checkConfirmPassword();
          if (value.length < 8) {
            this.setState({
              hasPasswordError: true,
              passwordErrorType: ERROR_TYPE.PASSWORD_TOO_SHORT,
            });
          } else if (value.length > 20) {
            this.setState({
              hasPasswordError: true,
              passwordErrorType: ERROR_TYPE.PASSWORD_TOO_LONG,
            });
          } else {
            this.setState({
              hasPasswordError: false,
              passwordErrorType: '',
            });
            return true;
          }
          break;
        case FIELD_TYPE.CONFIRM_PASSWORD:
          return this.checkConfirmPassword();
        case FIELD_TYPE.USERNAME:
          if (!validPattern.usernamePattern.test(value)) {
            this.setState({
              hasUsernameError: true,
              usernameErrorType: ERROR_TYPE.USERNAME_INVALID,
            });
          } else if (value.length > 20) {
            this.setState({
              hasUsernameError: true,
              usernameErrorType: ERROR_TYPE.USERNAME_TOO_LONG,
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

    let placeholder = type;
    if (type === FIELD_TYPE.CONFIRM_PASSWORD) {
      placeholder = 'confirm password';
    }
    if (type === FIELD_TYPE.EMAIL) {
      placeholder = 'email (we only support gmail now)';
    }
    return (
      <div className="mb-4 w-full">
        <input
          type={
            type === FIELD_TYPE.CONFIRM_PASSWORD ? FIELD_TYPE.PASSWORD : type
          }
          className={inputStyle}
          placeholder={placeholder}
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

  renderFacebookSignupForm(client) {
    return (
      <React.Fragment>
        <div className="text-xl mb-8">Please Enter Your Username</div>
        <form
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          className="w-full">
          {this.renderInputField(FIELD_TYPE.USERNAME)}
        </form>
        <div className="mt-4 border px-4 py-4 rounded cursor-pointer">
          <span
            className={
              this.checkInputDone([FIELD_TYPE.USERNAME])
                ? 'text-gray'
                : 'text-gray-500'
            }
            onClick={() => {
              this.doRegistByFacebook(client);
            }}>
            Create Account
          </span>
        </div>
      </React.Fragment>
    );
  }

  renderSignupForm(client) {
    return (
      <React.Fragment>
        <div className="text-xl mb-8">
          Register to Share Your Music and Story
        </div>
        <form
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          className="w-full">
          {this.renderInputField(FIELD_TYPE.EMAIL)}
          {this.renderInputField(FIELD_TYPE.PASSWORD)}
          {this.renderInputField(FIELD_TYPE.CONFIRM_PASSWORD)}
          {this.renderInputField(FIELD_TYPE.USERNAME)}
        </form>
        <div className="mt-4 border px-4 py-4 rounded cursor-pointer">
          <span
            className={this.checkInputDone() ? 'text-gray' : 'text-gray-500'}
            onClick={() => {
              this.doRegist(client);
            }}>
            Create Account
          </span>
        </div>
        <div className="mt-4 text-gray-500">OR</div>
        <a href={`${process.env.API_URI}/auth/facebook`}>
          <div className="mt-4 border border-facebook px-4 py-4 rounded cursor-pointer">
            <span className="text-facebook">Continue with Facebook</span>
          </div>
        </a>
      </React.Fragment>
    );
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div className="fixed w-full h-full flex items-center justify-around bg-black-75 z-50">
            {this.state.isInitLoading ? null : (
              <div
                ref={this.wrapperRef}
                id="signup"
                className="flex flex-col items-center mt-20 border bg-white px-16 py-8 rounded w-128">
                {this.state.isLoading && <Loader />}
                {this.state.isFacebookSignup
                  ? this.renderFacebookSignupForm(client)
                  : this.renderSignupForm(client)}
              </div>
            )}
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Signup;
