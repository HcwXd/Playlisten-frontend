import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import sha256 from 'sha256';
import { validPattern } from '../../utils/configConst';
import { capitalize } from '../../utils/generalUtils';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasEmailError: false,
      hasPasswordError: false,

      emailErrorType: '',
      passwordErrorType: '',

      email: '',
      password: '',
      isButtonActive: false,
    };
    this.wrapperRef = React.createRef();
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
    this.handleRegist = this.handleRegist.bind(this);
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

  handleRegist() {
    let isValid = true;
    const isValidPromise = ['email', 'password'].map(async type =>
      this.doValidate(type),
    );

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
      this.handleRegist(e);
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
            {this.renderInputField('email')}
            {this.renderInputField('password')}
          </form>
          <div className="mt-8 border px-4 py-4 rounded cursor-pointer">
            <span className="" onClick={this.handleRegist}>
              Sign In
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
