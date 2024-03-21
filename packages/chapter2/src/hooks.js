export function createHooks(callback) {
  const arrStates = [];
  let currStateIndex = 0;

  const useState = (initState) => {
    if (arrStates.length === currStateIndex) {
      arrStates.push(initState);
    }
    const state = arrStates[currStateIndex];
    const __index = currStateIndex;
    const setState = (newState) => {
      if (newState === state || JSON.stringify(newState) === JSON.stringify(state)) return;
      arrStates[__index] = newState;
      callback();
    };
    currStateIndex += 1;
    return [state, setState];
  };

  const memoDeps = [];
  let currMemoIndex = 0;

  const useMemo = (fn, refs) => {
    if (memoDeps[currMemoIndex] === undefined
      || !isSameArray(memoDeps[currMemoIndex][1], refs)) {
      const newValue = fn();
      memoDeps[currMemoIndex] = [newValue, refs];
    }

    const value = memoDeps[currMemoIndex][0];
    currMemoIndex += 1;
    return value;
  };

  const resetContext = () => {
    currStateIndex = 0;
    currMemoIndex = 0;
  }

  const isSameArray = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    if (!arr1.every((dep, index) => dep === arr2[index])) return false;
    return true;
  }

  return { useState, useMemo, resetContext };
}
