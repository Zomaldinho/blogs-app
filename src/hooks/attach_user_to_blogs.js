// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const blogs = context.result.data;
    await Promise.all(
      blogs.map(async (blog) => {
        const user_id = blog.user_id.toString();
        const user = await context.app.service("users")._get(user_id);
        blog.user = user;
        delete blog.user_id;
      })
    );
    context.result = blogs;
    return context;
  };
};
