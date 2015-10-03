import {uuid} from '../helpers';
import _ from 'lodash';
//import Immutable from 'immutable';


//const LOAD = 'hpcapp/formulas/LOAD';
const CREATE = 'hpcapp/formulas/CREATE';
const UPDATE = 'hpcapp/formulas/UPDATE';
const REMOVE = 'hpcapp/formulas/REMOVE';


export default function reducers(state=[], action) {

  let stateTemp = _.clone(state);

  switch (action.type) {

  case CREATE:
    stateTemp.push(action.data.formula);
    return stateTemp;

  case UPDATE:
    let index = _.findIndex(stateTemp, formula => formula.id === action.data.formula.id);
    stateTemp[index] = action.data.formula;
    return stateTemp;

  case REMOVE:
    _.remove(stateTemp, (formula) => formula.id === action.data.formula);
    return stateTemp;
  default:
    return state;
  }
}

/**
 * formula{id, name, content}
 **/
//export function loadFormulas() {
//  return {type: LOAD};
//}

export function createFormula(formula) {
  return {type: CREATE, data : {formula}};
}

export function updateFormula(formula) {
  return {type: UPDATE, data : {formula}};
}

export function removeFormula(formula) {
  return {type: REMOVE, data : {formula}};
}
