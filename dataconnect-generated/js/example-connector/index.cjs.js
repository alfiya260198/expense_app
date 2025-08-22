const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'expensetrackerapp',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const addNewMovieListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewMovieList', inputVars);
}
addNewMovieListRef.operationName = 'AddNewMovieList';
exports.addNewMovieListRef = addNewMovieListRef;

exports.addNewMovieList = function addNewMovieList(dcOrVars, vars) {
  return executeMutation(addNewMovieListRef(dcOrVars, vars));
};

const getPublicMovieListsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicMovieLists');
}
getPublicMovieListsRef.operationName = 'GetPublicMovieLists';
exports.getPublicMovieListsRef = getPublicMovieListsRef;

exports.getPublicMovieLists = function getPublicMovieLists(dc) {
  return executeQuery(getPublicMovieListsRef(dc));
};

const addMovieToMovieListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMovieToMovieList', inputVars);
}
addMovieToMovieListRef.operationName = 'AddMovieToMovieList';
exports.addMovieToMovieListRef = addMovieToMovieListRef;

exports.addMovieToMovieList = function addMovieToMovieList(dcOrVars, vars) {
  return executeMutation(addMovieToMovieListRef(dcOrVars, vars));
};

const getMoviesInMovieListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMoviesInMovieList', inputVars);
}
getMoviesInMovieListRef.operationName = 'GetMoviesInMovieList';
exports.getMoviesInMovieListRef = getMoviesInMovieListRef;

exports.getMoviesInMovieList = function getMoviesInMovieList(dcOrVars, vars) {
  return executeQuery(getMoviesInMovieListRef(dcOrVars, vars));
};
