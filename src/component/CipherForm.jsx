// @flow
import * as React from 'react';

type Props = {
  onSubmit: Function,
  onChange: Function,
  phrase: string,
  keyword: string,
}

export default class CipherForm extends React.Component<Props> {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <label>
          Text to cipher:
          <input name="phrase" type="text" value={this.props.phrase} onChange={this.props.onChange}/>
        </label>
        <label>
          Keyword:
          <input name="keyword" type="text" value={this.props.keyword} onChange={this.props.onChange}/>
        </label>
        <input type="submit" value="Cipher"/>
      </form>
    )
  }
}