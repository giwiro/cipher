// @flow
import * as React from 'react';
import CipherForm from '../component/CipherForm';

type State = {
  phrase: string,
  keyword: string,
  ePhrase: string,
}

// Padding to take care
const padding = 17;
// a
const baseCharCode = 97;
// z
const endCharCode = 122;

const ex = (a: string, b: string) => {
  let r = (((a.charCodeAt(0) + b.charCodeAt(0)) - 97) % 26) + 97;
  r = r >= (baseCharCode + padding) ? r - padding : endCharCode - (padding - (r - baseCharCode));
  // console.log(`${a} + ${b} = ${String.fromCharCode(r)}`);
  return String.fromCharCode(r);
};

export default class Cipher extends React.Component<{}, State> {
  state = {
    phrase: 'hola chau chau',
    keyword: 'bye',
    ePhrase: '',
  };

  handleSubmit(event: Event) {
    event.preventDefault();
    this.encrypt(this.state.phrase, this.state.keyword);
  }

  encrypt(phrase: string, keyword: string) {
    const phraseLen = phrase.length;
    const keywordLen = keyword.length;
    let r = '';
    let hopCount = 0;
    for (let i = 0; i < phraseLen; i ++) {
      if (phrase[i] === ' ') {
        r += ' ';
        hopCount++;
      } else r += ex(phrase[i], keyword[(i - hopCount) % keywordLen]);
    }
    this.setState({
        ePhrase: r,
      }
    )
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
