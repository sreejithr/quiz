import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

import Option from './Option';

const TRANSITION_DURATION = 300;

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question,
      invalidOption: false,
      'in': true,
    };
  }

  componentWillReceiveProps({ question }) {
    setTimeout(
      () => this.setState({ question, in: true }),
      TRANSITION_DURATION
    );
  }

  onKeyUp(e) {
    if ('abcdefghijklmnopqrstuvwxyz'.split('').indexOf(e.key) !== -1) {
      this.onOptionSelect(e.key);
    }
  }

  toggleInvalidOption() {
    function toggleBack() {
      setTimeout(
        () => this.setState({ invalidOption: false }),
        TRANSITION_DURATION,
      );
    }
    this.setState({ invalidOption: true }, toggleBack);
  }

  onOptionSelect(key: String) {
    const pressed = key.toLowerCase(),
          validOptions = 'abcdefghijklmnopqrstuvwxyz'.slice(
            0, this.state.question.options.length
          ).split(''),
          keyIndex = validOptions.indexOf(pressed);

    if (keyIndex === -1) {
      this.toggleInvalidOption();
    } else {
      const isCorrect = keyIndex === this.state.question.answer;
      this.props.onAttempt && this.props.onAttempt(isCorrect);
      this.setState({ in: false });
    }
  }

  componentWillMount() {
    document.onkeyup = this.onKeyUp.bind(this);
  }

  _renderInvalidOption() {
    return (
      <div>
        {this.state.invalidOption ? (
            <div style={{...styles.errorText, ...styles.errorTransition}}>
              Invalid option
            </div>
        ): null}
      </div>
    );
  }

  render() {
    const self = this,
          question = this.state.question;
    return (
        <Transition in={this.state.in} timeout={TRANSITION_DURATION}>
          {state => (
            <div style={{...styles.container, ...styles.qTransition[state]}}>
              <p>{question.text}</p>
              {question.options.map((o, i) => (
                  <Option
                    onClick={this.onOptionSelect.bind(this)}
                    option={o}
                    index={i} 
                  />
              ))}
              {this._renderInvalidOption()}
            </div>
          )}
        </Transition>
    );
  }
}

const styles = {
  container: {
    color: 'white',
    transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
    opacity: 0,
  },
  qTransition: {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
  },
  errorText: {
    opacity: 0,
    transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
  },
  errorTransition: {
    opacity: 1,
  },
};
