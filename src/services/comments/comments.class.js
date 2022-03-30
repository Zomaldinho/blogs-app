/* eslint-disable no-unused-vars */
exports.Comments = class Comments {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async create(data, params) {
    const { text, user_id, blog_id } = data;
    const blog = await this.app.service("blogs")._get(blog_id);
    const updatedBlog = await this.app
      .service("blogs")
      ._patch(blog_id, { comments: [...blog.comments, { text, user_id }] });
    return updatedBlog;
  }

  async patch(id, data, params) {
    const { text, blog_id } = data;
    const blog = await this.app.service("blogs")._get(blog_id);
    blog.comments.map(comment => {
      if(comment._id.toString() == id){
        comment.text = text
      }
    })
    const updatedBlog = await this.app
      .service("blogs")
      ._patch(blog_id, { comments: blog.comments });
    return updatedBlog;
  }

  async remove(id, params) {
    const { blog_id } = params.query
    const blog = await this.app.service("blogs")._get(blog_id);
    let newComments = []
    blog.comments.map(comment => {
      if(comment._id.toString() != id){
        newComments.push(comment)
      }
    })
    const updatedBlog = await this.app
      .service("blogs")
      ._patch(blog_id, { comments: newComments });
    return updatedBlog;
  }
};
