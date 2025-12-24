import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'vavyapi',
  location: 'us-east4'
};

export const addReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}
addReviewRef.operationName = 'AddReview';

export function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
}

export const getExperienceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExperience', inputVars);
}
getExperienceRef.operationName = 'GetExperience';

export function getExperience(dcOrVars, vars) {
  return executeQuery(getExperienceRef(dcOrVars, vars));
}

export const createWishlistRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateWishlist', inputVars);
}
createWishlistRef.operationName = 'CreateWishlist';

export function createWishlist(dcOrVars, vars) {
  return executeMutation(createWishlistRef(dcOrVars, vars));
}

export const listExperiencesByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExperiencesByCategory', inputVars);
}
listExperiencesByCategoryRef.operationName = 'ListExperiencesByCategory';

export function listExperiencesByCategory(dcOrVars, vars) {
  return executeQuery(listExperiencesByCategoryRef(dcOrVars, vars));
}

