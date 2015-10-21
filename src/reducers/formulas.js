import {uuid} from '../helpers';
import _ from 'lodash';


const CREATE = 'hpcapp/formulas/CREATE';
const UPDATE = 'hpcapp/formulas/UPDATE';
const REMOVE = 'hpcapp/formulas/REMOVE';


export default function reducers(state=[{
  id : uuid(),
  name: 'sqrt',
  content: 'a*a'
}], action) {

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
