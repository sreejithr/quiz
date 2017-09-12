import React, { Component } from 'react';
import jQuery from 'jquery';

import Question from './Question';

const url = 'https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      qIndex: 0,
      loading: true,
      testOver: false,
      report: {},
    };
  }

  componentWillMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    jQuery.ajax({
      url,
      method: 'GET',
      success: questions => this.setState({ questions, loading: false }),
      error: err => this.setState({ loading: false }),
    });
  }

  onAttempt(isCorrect: bool) {
    if (this.state.qIndex === this.state.questions.length-1) {
      this.setState({ testOver: true });
    }

    this.setState({
      qIndex: this.state.qIndex + 1,
      report: [ ...this.state.report, { index: this.state.qIndex, isCorrect } ],
    }); 
  }

  _renderQuestion() {
    if (this.state.loading) {
      return <div>Loading</div>;
    }

    if (this.state.questions.length < 1 && !this.state.loading) {
      return <div>No questions for now!</div>;
    }

    return (
        <Question
          question={this.state.questions[this.state.qIndex]}
          onAttempt={this.onAttempt.bind(this)}
        />
    );
  }

  _renderReportCard() {
    const correct = this.state.report.filter(e => e.isCorrect).length,
          total = this.state.report.length;
    return (
        <div style={styles.reportCard}>
          <h2>Report Card</h2>
          <h3>{(correct/total * 100).toFixed(1)}%</h3>
          <p>You got {correct} out of {total} correct!</p>
        </div>
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.quizBoard}>
          <h2>Quiz</h2>
          {this.state.testOver ? this._renderReportCard() : this._renderQuestion()}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  quizBoard: {
    border: '10px solid #DEB887',
    padding: 20,
    width: 600,
    height: 400,
    backgroundColor: 'rgb(18, 121, 91)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  
};

export default App;
