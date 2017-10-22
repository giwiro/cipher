// @flow
import * as React from 'react';
import CipherForm from '../component/CipherForm';
import { encrypt } from '../lib/crypto';

type State = {
  phrase: string,
  keyword: string,
  ePhrase: string,
}

export default class Cipher extends React.Component<{}, State> {
  state = {
    phrase: 'hola chau',
    keyword: 'bye',
    ePhrase: '',
  };

  handleSubmit(event: Event) {
    event.preventDefault();
    const ePhrase = encrypt(this.state.phrase, this.state.keyword);
    this.setState({ ePhrase });
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        <div>
          <CipherForm
            phrase={this.state.phrase}
            keyword={this.state.keyword}
            onSubmit={(event) => this.handleSubmit(event)}
            onChange={(event) => this.handleChange(event)}/>
        </div>
        <div>{this.state.ePhrase}</div>
      </div>
    )
  }
}
