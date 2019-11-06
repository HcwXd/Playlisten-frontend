import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import sha256 from 'sha256';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import { validPattern } from '../../utils/configConst';
import { capitalize } from '../../utils/generalUtils';

const SIGN_IN = gql`
  mutation($userInput: SignInInput!) {
    signIn(data: $userInput) {
      result
    }
  }
`;

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.wrapperRef.current.contains(event.target)) {
      this.props.toggleSigninForm();
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  checkAllInputValid() {
    let isValid = true;
    ['username', 'password'].forEach(type => {
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
      const { data } = await client.mutate({
        mutation: SIGN_IN,
        variables: {
          userInput,
        },
      });

      console.log(data);
      if (data.signIn.result !== 'success') {
        alert('Username has been used');
      } else {
        alert('Sign in failed');
      }
    }
  }

  checkInputDone() {
    const fields = ['username', 'password'];
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
        case 'username':
          if (!validPattern.usernamePattern.test(value)) {
            this.setState({
              hasusernameError: true,
              usernameErrorType: 'This username format is invalid.',
            });
          } else {
            this.setState({
              hasusernameError: false,
              usernameErrorType: '',
            });
            return true;
          }
          break;
        case 'password':
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
      this.handleSignIn(e);
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
          <div className="fixed w-full h-full flex items-center justify-around bg-black-90 z-50">
            <div
              ref={this.wrapperRef}
              id="signup"
              className="flex flex-col items-center mt-20 border bg-white px-16 py-8 rounded w-128">
              <div className="text-xl mb-8">Sign In to Playlisten</div>
              <form
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                className="w-full">
                {this.renderInputField('username')}
                {this.renderInputField('password')}
              </form>
              <div className="mt-8 border px-4 py-4 rounded cursor-pointer">
                <span
                  className={
                    this.checkInputDone() ? 'text-gray' : 'text-gray-500'
                  }
                  onClick={() => {
                    this.handleSignIn(client);
                  }}>
                  Sign In
                </span>
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Signin;
