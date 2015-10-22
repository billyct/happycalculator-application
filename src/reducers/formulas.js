import {uuid} from '../helpers';
import _ from 'lodash';
import {THE_INIT_FORMULAS} from '../constants';

import confirm from '../components/Confirm';


const CREATE = 'hpcapp/formulas/CREATE';
const UPDATE = 'hpcapp/formulas/UPDATE';
const REMOVE = 'hpcapp/formulas/REMOVE';


export default function reducers(state = THE_INIT_FORMULAS, action) {

  let stateTemp = _.clone(state);

  switch (action.type) {

  case CREATE:
    //action.data {id:'', name, content}
    stateTemp.push(_.assign({}, action.data.formula, {id: uuid()}));
    return stateTemp;

  case UPDATE:
    //action.data {id, name, content}
    let index = _.findIndex(stateTemp, formula => formula.id === action.data.formula.id);
    stateTemp[index] = action.data.formula;
    return stateTemp;

  case REMOVE:
    //action.data {id}
    _.remove(stateTemp, (formula) => formula.id === action.data.formula.id);
    return stateTemp;
  default:
    return state;
  }
}

/**
 * formula{id, name, content}
 **/

export function createFormula(formula) {
  return {type: CREATE, data : {formula}};
}

export function updateFormula(formula) {
  return {type: UPDATE, data : {formula}};
}

export function removeFormula(formula) {
  return {type: REMOVE, data : {formula}};
}

export function removeFormulaWithConfirm(formula) {
  //thunk middleware example,nice 如果使用到去操作服务端的话，非常有用
  return (dispatch) => {
    confirm(`Delete the formula "${formula.name}", are you sure?`, {
      confirmHandler : () => {
        dispatch(removeFormula(formula));
      }
    });
  }
}
