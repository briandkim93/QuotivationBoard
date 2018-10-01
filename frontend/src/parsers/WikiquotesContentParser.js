class WikiquotesContentParser {
  constructor(content) {
    this.content = content;
  }
  parse() {
    let parsedString = this.content;
    let quotesArray = [];

    function citationSquareBracketsReplacer(match) {
      if (match.includes('|')) {
        return match.replace(/\[(.*)\|/, '').replace(']]', '');
      } else {
        return match.replace('[[', '').replace(']]', '');
      }
    }

    function linkSquareBracketsReplacer(match) {
      if (match.includes(' ')) {
        match = match.replace(']', '');
        const result = match.split(' ');
        result.shift();
        return result;
      }
    }

    if (parsedString.indexOf('[[Category')) {
      const categoriesString = parsedString.slice(parsedString.indexOf('[[Category'), parsedString.lastIndexOf('[[Category'));
      if (
        !categoriesString.includes('birth') && 
        !categoriesString.includes('death') &&
        !categoriesString.includes('Birth') && 
        !categoriesString.includes('Death') &&
        !categoriesString.includes('people') &&
        !categoriesString.includes('People')
      ) {
        parsedString = '';
      }
    }

    if (parsedString.split("== Discography ==")[0]) {
      parsedString = parsedString.split("== Discography ==")[0];
    }
    if (parsedString.split("==Discography==")[0]) {
      parsedString = parsedString.split("==Discography==")[0];
    }
    if (parsedString.split("== Quotes about")[0]) {
      parsedString = parsedString.split("== Quotes about")[0];
    }
    if (parsedString.split("==Quotes about")) {
      parsedString = parsedString.split("==Quotes about")[0];
    }
    if (parsedString.split("==About")) {
      parsedString = parsedString.split("==About")[0];
    }
    if (parsedString.split("==See")) {
      parsedString = parsedString.split("==See")[0];
    }
    if (parsedString.split("== See")) {
      parsedString = parsedString.split("== See")[0];
    }
    if (parsedString.split("== About")) {
      parsedString = parsedString.split("== About")[0];
    }
    if (parsedString.split("== Disputed ==")) {
      parsedString = parsedString.split("== Disputed ==")[0];
    }
    if (parsedString.split("==Disputed==")) {
      parsedString = parsedString.split("==Disputed==")[0];
    }
    if (parsedString.split("== Misattributed ==")) {
      parsedString = parsedString.split("== Misattributed ==")[0];
    }
    if (parsedString.split("==Misattributed==")) {
      parsedString = parsedString.split("==Misattributed==")[0];
    }
    if (parsedString.split("== External links ==")[0]) {
      parsedString = parsedString.split("== External links ==")[0];
    }
    if (parsedString.split("==External links==")[0]) {
      parsedString = parsedString.split("==External links==")[0];
    }

    parsedString = parsedString.replace(/\<br\>/g, ' ');
    parsedString = parsedString.replace(/\<br\/\>/g, ' ');
    parsedString = parsedString.replace(/\<BR\>/g, ' ');
    parsedString = parsedString.replace(/\<BR\/\>/g, ' ');
    parsedString = parsedString.replace(/\[\[(.*?)\]\]/g, citationSquareBracketsReplacer);
    parsedString = parsedString.replace(/\[http(.*?)\]/g, linkSquareBracketsReplacer);
    parsedString = parsedString.replace(/\{\{w\|/g, '');
    parsedString = parsedString.replace(/\}\}/g, '');
    parsedString = parsedString.replace(/\<(.*?)\>/g, '');
    parsedString = parsedString.replace(/&nbsp;\.\./g, '');
    parsedString = parsedString.replace(/&nbsp;/g, '');
    parsedString = parsedString.replace(/''''/g, '"');
    parsedString = parsedString.replace(/'''/g, '"');
    parsedString = parsedString.replace(/''/g, '"');

    parsedString = parsedString.replace(/ p. \d-\d\d/g, '');
    parsedString = parsedString.replace(/ p. \d-\d/g, '');
    parsedString = parsedString.replace(/ p. \d\d-\d\d\d/g, '');
    parsedString = parsedString.replace(/ p. \d\d-\d\d/g, '');
    parsedString = parsedString.replace(/ p. \d\d\d-\d\d\d\d/g, '');
    parsedString = parsedString.replace(/ p. \d\d\d-\d\d\d/g, '');
    parsedString = parsedString.replace(/ p. \d\d\d\d/g, '');
    parsedString = parsedString.replace(/ p. \d\d\d/g, '');
    parsedString = parsedString.replace(/ p. \d\d/g, '');
    parsedString = parsedString.replace(/ P. \d-\d\d/g, '');
    parsedString = parsedString.replace(/ P. \d-\d/g, '');
    parsedString = parsedString.replace(/ P. \d\d-\d\d\d/g, '');
    parsedString = parsedString.replace(/ P. \d\d-\d\d/g, '');
    parsedString = parsedString.replace(/ P. \d\d\d-\d\d\d\d/g, '');
    parsedString = parsedString.replace(/ P. \d\d\d-\d\d\d/g, '');
    parsedString = parsedString.replace(/ p. \d/g, '');
    parsedString = parsedString.replace(/ P. \d\d\d\d/g, '');
    parsedString = parsedString.replace(/ P. \d\d\d/g, '');
    parsedString = parsedString.replace(/ P. \d\d/g, '');
    parsedString = parsedString.replace(/ P. \d/g, '');
    parsedString = parsedString.replace(/\(preface\)/g, '');
    parsedString = parsedString.replace(/\(Preface\)/g, '');    
    parsedString = parsedString.replace(/\(dedication\)/g, '');
    parsedString = parsedString.replace(/\(Dedication\)/g, '');

    if (parsedString.includes('==Quotes==')) {
      parsedString = parsedString.split("==Quotes==")[1];
    } else if (parsedString.includes('== Quotes ==')) {
      parsedString = parsedString.split("== Quotes ==")[1];
    } else if (parsedString.includes('==Quotations==')) {
      parsedString = parsedString.split("==Quotations==")[1];
    } else if (parsedString.includes('== Quotations ==')) {
      parsedString = parsedString.split("== Quotations ==")[1];
    } else if (parsedString.includes('==Sourced==')) {
      parsedString = parsedString.split('==Sourced==')[1];
    } else if (parsedString.includes('== Sourced ==')) {
      parsedString = parsedString.split('== Sourced ==')[1];
    } else if (parsedString.length >= 10000) {
      parsedString = parsedString;
    } else {
      parsedString = '';
    }

    quotesArray = parsedString.split("\n");
    quotesArray = quotesArray.filter(text => !text.startsWith('**'));
    quotesArray = quotesArray.filter(text => !text.startsWith('* As quoted'));
    quotesArray = quotesArray.filter(text => !text.startsWith('*:Quoted in'));
    quotesArray = quotesArray.filter(text => !text.startsWith(':('));
    quotesArray = quotesArray.filter(text => !text.includes('{{cite'));
    quotesArray = quotesArray.filter(text => text.startsWith('*'));
    quotesArray = quotesArray.map(text => text.replace('*', ''));
    quotesArray = quotesArray.map(text => text.replace('{{source.', ''));
    quotesArray = quotesArray.map(text => text.trim());
    quotesArray = quotesArray.filter(text => !text.startsWith('source:'));
    quotesArray = quotesArray.filter(text => !text.startsWith('Source:'));
    quotesArray = quotesArray.filter(text => !text.startsWith('Translated by'));
    quotesArray = quotesArray.filter(text => !text.endsWith('Preface'));
    quotesArray = quotesArray.map(text => text.endsWith(' ..') ? text.replace(' ..', '') : text);
    quotesArray = quotesArray.map(text => (/\w$/).test(text) ? text + '.' : text);
    quotesArray = quotesArray.map(text => (/^".*"$/).test(text) && text.split(/"/).length - 1 === 2 ? text.slice(1, text.length - 1) : text);
    quotesArray = quotesArray.filter(text => text.length <= 300)
    if (quotesArray.length >= 10) {
      return quotesArray;
    } else {
      return [];
    }
  }
}

export default WikiquotesContentParser;