'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let ArchiveOfState = [];
  let currentState = { ...state };

  for (let action of actions) {
    let stateCopy = { ...currentState };

    if (action.type === 'clear') {
        stateCopy = {};
        ArchiveOfState.push(stateCopy);
        currentState = stateCopy;
      }

    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
      ArchiveOfState.push(stateCopy);
      currentState = stateCopy;
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
        currentState = stateCopy;
      }
      ArchiveOfState.push(stateCopy);

    }
  }
  return ArchiveOfState

}

module.exports = transformStateWithClones;
