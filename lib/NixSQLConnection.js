var edge = require('edge');
var Q = require('q');

function NixSQLConnection(params) {
  this.params = params;
};

/**
 * Executes a stored procedure
 * @param  {String}   procedureName The name of the procedure to call
 * @param  {Object}   parameters    A key-value list of parameters to send to the procedure
 * @param  {Function} callback      The callback function that will be called when the data is returned.
 * @return {Promise} Promise containing result
 */
NixSQLConnection.prototype.executeStoredProcedure = function(procedureName, parameters) {

  var deferred = Q.defer();

  this.params.source = 'EXEC ' + procedureName;
  var getProcedureResult = edge.func('sql', this.params);

  getProcedureResult(parameters, function(error, resultSet) {
      if(error) {
        deferred.reject(error);
      }
      else {
        deferred.resolve(resultSet);
      }
  });

  return deferred.promise;

};

module.exports = NixSQLAdapter;
