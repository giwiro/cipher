// @flow

// Padding to take care
const padding = 17;
// a
const baseCharCode = 97;
// z
const endCharCode = 122;
// alphabet size
const alphabetSize = 26;

const ex = (a: string, b: string): string => {
  let r = (((a.charCodeAt(0) + b.charCodeAt(0)) - baseCharCode) % alphabetSize) + baseCharCode;
  r = r >= (baseCharCode + padding) ? r - padding : endCharCode - (padding - (r - baseCharCode));
  // console.log(`${a} + ${b} = ${String.fromCharCode(r)}`);
  return String.fromCharCode(r);
};

export function encrypt(phrase: string, keyword: string): string {
  let r = '';
  let hopCount = 0;
  for (let i = 0; i < phrase.length; i ++) {
    if (phrase[i] === ' ') {
      r += ' ';
      hopCount++;
    } else r += ex(phrase[i], keyword[(i - hopCount) % keyword.length]);
  }
  return r;
}
