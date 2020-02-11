import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import sha256 from 'sha256';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import Loader from '../Loader';
import { validPattern } from '../../utils/configConst';
import { capitalize, setLocalStorageLoginInfo } from '../../utils/generalUtils';
import { ERROR_TYPE, FIELD_TYPE } from '../Signup/constants';

import { Router, Link } from '../../routes';

const SIGN_IN = gql`
  mutation($userInput: SignInInput!) {
    signIn(data: $userInput) {
      result
      token
      user {
        id
        name
      }
    }
  }
`;

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      hasUsernameError: false,
      hasPasswordError: false,

      usernameErrorType: '',
      passwordErrorType: '',

      username: '',
      password: '',
      isButtonActive: false,
    };
    this.wrapperRef = React.createRef();
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.doValidate = this.doValidate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.renderSigninForm = this.renderSigninForm.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.wrapperRef.current) return;
    if (!this.wrapperRef.current.contains(event.target)) {
      this.props.toggleSigninForm();
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  checkAllInputValid() {
    let isValid = true;
    [FIELD_TYPE.USERNAME, FIELD_TYPE.PASSWORD].forEach(type => {
      if (!this.doValidate(type)) {
        isValid = false;
      }
    });
    return isValid;
  }

  async handleSignIn(client) {
    if (this.checkAllInputValid()) {
      const userInput = {
        userName: this.state.username,
        password: sha256(this.state.password),
      };
      this.setState({ isLoading: true });
      const { data } = await client.mutate({
        mutation: SIGN_IN,
        variables: {
          userInput,
        },
      });

      const { signIn } = data;
      const { result, token, user } = signIn;
      if (result !== 'success') {
        alert('Sign in failed');
      } else if (user) {
        const { id, name } = user;
        setLocalStorageLoginInfo({ token, id, name });
        window.location = `/profile?userId=${id}`;
      }
      this.setState({ isLoading: false });
    }
  }

  checkInputDone() {
    const fields = [FIELD_TYPE.USERNAME, FIELD_TYPE.PASSWORD];
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

  handleInputOnChange({ target }) {
    const { value } = target;
    const { name } = target.dataset;
    this.setState({
      [name]: value,
    });
  }

  async doValidate(type) {
    const value = this.state[type];
    if (value) {
      switch (type) {
        case FIELD_TYPE.USERNAME:
          if (!validPattern.usernamePattern.test(value)) {
            this.setState({
              hasusernameError: true,
              usernameErrorType: ERROR_TYPE.USERNAME_INVALID,
            });
          } else {
            this.setState({
              hasusernameError: false,
              usernameErrorType: '',
            });
            return true;
          }
          break;
        case FIELD_TYPE.PASSWORD:
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
    return (
      <div className="mb-4 w-full">
        <input
          type={type}
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

  renderSigninForm(client) {
    return (
      <React.Fragment>
        <div className="text-xl mb-8">Sign In to Playlisten</div>
        <form
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          className="w-full">
          {this.renderInputField(FIELD_TYPE.USERNAME)}
          {this.renderInputField(FIELD_TYPE.PASSWORD)}
        </form>
        <div className="mt-8 border px-4 py-4 rounded cursor-pointer">
          <span
            className={this.checkInputDone() ? 'text-gray' : 'text-gray-500'}
            onClick={() => {
              this.handleSignIn(client);
            }}>
            Sign In
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
            <div
              ref={this.wrapperRef}
              id="signup"
              className="flex flex-col items-center mt-20 border bg-white px-16 py-8 rounded w-128">
              {this.state.isLoading && <Loader />}
              {this.renderSigninForm(client)}
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Signin;
