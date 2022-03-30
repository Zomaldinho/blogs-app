// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const http_errors = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const blogId = context.id
    const user = context.params.user
    const blog = await context.app.service('blogs')._get(blogId)
    if(blog.user_id.toString() != user._id.toString() && user.role != "admin"){
      throw new http_errors.Forbidden('Only blog owner can do this action!');
    }
    return context;
  };
};
