const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'vavyapi',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}
addReviewRef.operationName = 'AddReview';
exports.addReviewRef = addReviewRef;

exports.addReview = function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
};

const getExperienceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExperience', inputVars);
}
getExperienceRef.operationName = 'GetExperience';
exports.getExperienceRef = getExperienceRef;

exports.getExperience = function getExperience(dcOrVars, vars) {
  return executeQuery(getExperienceRef(dcOrVars, vars));
};

const createWishlistRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateWishlist', inputVars);
}
createWishlistRef.operationName = 'CreateWishlist';
exports.createWishlistRef = createWishlistRef;

exports.createWishlist = function createWishlist(dcOrVars, vars) {
  return executeMutation(createWishlistRef(dcOrVars, vars));
};

const listExperiencesByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExperiencesByCategory', inputVars);
}
listExperiencesByCategoryRef.operationName = 'ListExperiencesByCategory';
exports.listExperiencesByCategoryRef = listExperiencesByCategoryRef;

exports.listExperiencesByCategory = function listExperiencesByCategory(dcOrVars, vars) {
  return executeQuery(listExperiencesByCategoryRef(dcOrVars, vars));
};
