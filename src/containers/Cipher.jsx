// @flow
import * as React from 'react';
import CipherForm from '../component/CipherForm';

type State = {
  phrase: string,
  keyword: string,
  ePhrase: string,
}

export default class Cipher extends React.Component<{}, State> {
  state = {
    phrase: '',
    keyword: '',
    ePhrase: '',
  };

  handleSubmit(event: Event) {
    event.preventDefault();
    this.encrypt(this.state.phrase, this.state.keyword);
  }

  encrypt(phrase: string, keyword: string) {
    const phraseLength = phrase.length;
    const keywordLength = keyword.length;
    const keywordTimes = Math.floor(phraseLength / keywordLength);
    const keywordForPhrase = keyword.repeat(keywordTimes).concat(keyword.substring(0, phraseLength - keywordLength));

    const getRightChar = (charCode) => {
      if (charCode > 123) {
        return getRightChar(charCode - 122);
      } else if (charCode < 97) {
        return charCode + 26;
      } else return charCode;
    };

    let phraseArray = phrase.split(' ');
    let iStart = 0;
    let result: String;
    result = phraseArray.map(e =>
      Array.prototype.map.call(e, x =>
        String.fromCharCode(getRightChar(x.charCodeAt(0) + keywordForPhrase.substr(iStart++, 1).charCodeAt(0)))
      ).join('')
    ).join(' ');

    this.setState({
        ePhrase: result,
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