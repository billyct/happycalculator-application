import _ from 'lodash';
import {languages} from '../constants';

const UPDATE = 'hpcapp/config/UPDATE';

export default function reducers(state = {
  language : 'en-us'
}, action) {

  let stateTemp = _.clone(state);

  switch (action.type) {

  case UPDATE:
    //action.data {language}
    return _.assign(stateTemp, action.data.config);

  default:
    return state;
  }
}

/**
 * config{language}
 **/
export function updateConfig(config) {
  return {type: UPDATE, data : {config}};
}

export function updateConfigWithReload(config){
  return (dispatch) => {
    dispatch(updateConfig(config));
    //todo 之后可以尝试不刷新更新语言，不过貌似不会太好弄，可能会调整比较大的结构
    window.location.reload();
  }
}

