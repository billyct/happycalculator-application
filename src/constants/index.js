import {uuid} from '../helpers';
import Language, {languages}  from './language';

export const SVG_URL = 'http://billyct.github.io/happycalculator-application/dist/icons/sprites.svg';//这个是根据gulp生成svg来做的静态的svg地址
export const COMMON_STYLE_CLASS = 'happy'; //common style name
export const LOCAL_STORAGE_KEY = 'happycalculator';
export const THE_INIT_FORMULAS = [
  {
    id: uuid(),
    name: 'sqrt',
    content: 'a*a'
  }
];

export {languages, Language};
let lang = 'en-us';
if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) !== null) {
  lang = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).config.language;
}
export const I18n = new Language(lang);