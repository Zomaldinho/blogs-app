// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const http_errors = require("@feathersjs/errors");
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const user = context.params.user;
    const blog_id = context.data.blog_id;
    const blog = await context.app.service("blogs")._get(blog_id);
    const comment = blog.comments.filter(
      (c) => c._id.toString() == context.id && c.user_id == user._id.toString()
    );
    if (!comment.length && user.role != "admin") {
      throw new http_errors.Forbidden(
        "you are not authorized to do this action"
      );
    }
    return context;
  };
};
