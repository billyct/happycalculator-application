import _ from 'lodash';

import enUs from './en-us';
import zhCn from './zh-cn';


export const languages = [
  {
    name : 'en-us',
    label : 'english',
    value : enUs
  },
  {
    name : 'zh-cn',
    label : '中文',
    value : zhCn
  }
];

export default class Language {

  constructor(lang) {
    this.language = _.find(languages, {name: lang}).value;
  }

  get(text) {

    let result = this.language[text];

    if(!!result && arguments.length > 1) {
      for(var i = 1; i <= arguments.length; i++) {
        var re = new RegExp(`\\$${i}`,'g');
        result = result.replace(re, arguments[i]);
      }
    }

    return result;
  }
}