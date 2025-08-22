import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'expensetrackerapp',
  location: 'us-central1'
};

export const addNewMovieListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewMovieList', inputVars);
}
addNewMovieListRef.operationName = 'AddNewMovieList';

export function addNewMovieList(dcOrVars, vars) {
  return executeMutation(addNewMovieListRef(dcOrVars, vars));
}

export const getPublicMovieListsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicMovieLists');
}
getPublicMovieListsRef.operationName = 'GetPublicMovieLists';

export function getPublicMovieLists(dc) {
  return executeQuery(getPublicMovieListsRef(dc));
}

export const addMovieToMovieListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMovieToMovieList', inputVars);
}
addMovieToMovieListRef.operationName = 'AddMovieToMovieList';

export function addMovieToMovieList(dcOrVars, vars) {
  return executeMutation(addMovieToMovieListRef(dcOrVars, vars));
}

export const getMoviesInMovieListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMoviesInMovieList', inputVars);
}
getMoviesInMovieListRef.operationName = 'GetMoviesInMovieList';

export function getMoviesInMovieList(dcOrVars, vars) {
  return executeQuery(getMoviesInMovieListRef(dcOrVars, vars));
}

