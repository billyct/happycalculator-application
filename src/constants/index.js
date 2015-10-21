import {uuid} from '../helpers';

export const SVG_URL = '/dist/icon/sprites.svg';//这个是根据gulp生成svg来做的静态的svg地址
export const COMMON_STYLE_CLASS = 'happy'; //common style name
export const THE_INIT_FORMULAS = [
  {
    id: uuid(),
    name: 'sqrt',
    content: 'a*a'
  }
]