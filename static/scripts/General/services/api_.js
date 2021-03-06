

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.factory:PatientService
 * @description
 * # PatientService
 * factory of the sbAdminApp
 */

//
function PatientService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/Patient/:Id');
}

function InsuranceInstituteService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/InsuranceInstitute/:Id');
}

function MedicalSpecialityService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/MedicalSpeciality/:Id');
}

function _genericService($resource,$cookies,URL) {
  return $resource(URL,
      {'Id': '@id'}, {
        query: {method: 'GET', params: { format: 'json'}, isArray: true,},     
        options: {method : "POST", params:{ format: 'json'}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}        
  });
}

/* EOF */
