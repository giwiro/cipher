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
    const abc = [...Array(26)].map((e, i) => String.fromCharCode(97 + i));
    let abcMap = new Map();
    let spacesIndexArray = [];
    let phraseWOSpaces = '';
    let count = 0;
    const getIndexOfSpaces = (phrase, index) => {
      let i = phrase.indexOf(' ', index);
      if (i !== -1) {
        spacesIndexArray.push(i - count);
        count++;
        getIndexOfSpaces(phrase, i + 1);
      } else return false;
    };
    getIndexOfSpaces(phrase.split(''), 0);
    const getPhraseWOSpaces = (phrase, index) => {
      let i = phrase.indexOf(' ', index);
      if (i !== -1) {
        phraseWOSpaces = phrase.replace(' ', '');
        getPhraseWOSpaces(phraseWOSpaces, i + 1);
      } else return false;
    };
    getPhraseWOSpaces(phrase);

    const phraseLength = phraseWOSpaces.length;
    const keywordLength = keyword.length;
    const keywordTimes = Math.floor(phraseLength / keywordLength);
    const keywordMod = phraseLength % keywordLength;
    const keywordForPhrase = keyword.repeat(keywordTimes).concat(keyword.substring(0, keywordMod));
    [...Array(26)].map((e, i) => abcMap.set(abc[i], i + 1));

    let sums = [...Array(phraseLength)].map((e, i) => {
      let total = abcMap.get(phraseWOSpaces.substring(i, i + 1)) + abcMap.get(keywordForPhrase.substring(i, i + 1));
      if (total >= 26) {
        total = total % 26;
      }
      return (total);
    });

    let result: String = '';
    sums.map((e, i) => {
      if (spacesIndexArray.includes(i)) {
        result = result.concat(' ');
      }
      result = result.concat(abc[(sums[i] - 1) === -1 ? 25 : (sums[i] - 1)]);
    });
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