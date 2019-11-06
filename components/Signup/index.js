import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import sha256 from 'sha256';
import { validPattern } from '../../utils/configConst';
import { capitalize } from '../../utils/generalUtils';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasEmailError: false,
      hasPasswordError: false,
      hasConfirmPasswordError: false,
      hasUsernameError: false,

      emailErrorType: '',
      passwordErrorType: '',
      usernameErrorType: '',

      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      isButtonActive: false,
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
    this.handleRegist = this.handleRegist.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.doValidate = this.doValidate.bind(this);
    this.handleEmailExist = this.handleEmailExist.bind(this);
    this.handleUsernameExist = this.handleUsernameExist.bind(this);
  }

  handleEmailExist() {
    this.setState({
      hasEmailError: true,
      emailErrorType: this.props.t('common:alert.email_exist'),
    });
  }

  handleUsernameExist() {
    this.setState({
      hasUsernameError: true,
      usernameErrorType: this.props.t('common:alert.username_exist'),
    });
  }

  handleRegist() {
    let isValid = true;
    const isValidPromise = [
      'email',
      'password',
      'confirmPassword',
      'username',
    ].map(async type => this.doValidate(type));

    Promise.all(isValidPromise).then(response => {
      response.forEach(check => {
        if (!check) {
          isValid = false;
        }
      });
      if (isValid) {
        this.doRegist();
      }
    });
  }

  checkInputDone(fields) {
    let result = true;
    for (let i = 0; i < fields.length; i++) {
      if (!this.state[fields[i]]) {
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
    this.setState({
      hasConfirmPasswordError: this.state.confirmPassword.length !== 0,
    });
    return false;
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
        case 'email':
          if (!validPattern.emailPattern.test(value)) {
            this.setState({
              hasEmailError: true,
              emailErrorType: this.props.t('common:alert.email_format'),
            });
          } else {
            return true;
          }
          break;
        case 'password':
          this.checkConfirmPassword();
          if (value.length < 8) {
            this.setState({
              hasPasswordError: true,
              passwordErrorType: this.props.t(
                'common:alert.password_too_short',
              ),
            });
          } else if (value.length > 20) {
            this.setState({
              hasPasswordError: true,
              passwordErrorType: this.props.t('common:alert.password_too_long'),
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
              hasEmailError: true,
              usernameErrorType: this.props.t('common:alert.username_format'),
            });
          } else {
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
      this.handleRegist(e);
    }
  }

  renderInputField(type) {
    const inputStyle = cx(
      {
        'border-red-500': this.state[`has${capitalize(type)}Error`],
        'border-green-500': !this.state[`has${capitalize(type)}Error`],
      },
      ['border-b', 'border-solid'],
    );
    return (
      <div className="mb-2">
        <input
          type={type}
          className={inputStyle}
          placeholder={this.props.t(type)}
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

  /**
   * All render logic
   * Including all conditional rendering.
   */
  render() {
    return (
      <div id="signup" className="h-full">
        <div className="flex flex-col items-center h-full w-full mt-20 border">
          <form onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}>
            {this.renderInputField('email')}
            {this.renderInputField('password')}
            {this.renderInputField('confirmPassword')}
            {this.renderInputField('username')}
          </form>
          <div className="bottom_wrap">
            <span className={``} onClick={this.handleRegist}>
              {this.props.t('sign_up')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
