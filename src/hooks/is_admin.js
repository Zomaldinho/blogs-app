// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const http_errors = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { user } = context.params;
    if(user && user.role !== 'admin'){
      throw new http_errors.Forbidden('Only admins can do this action!');
    }
    return context;
  };
};
