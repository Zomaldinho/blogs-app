const { authenticate } = require('@feathersjs/authentication').hooks;

const isBlogOwner = require('../../hooks/is_blog_owner');

const attachUserToBlogs = require('../../hooks/attach_user_to_blogs');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [isBlogOwner()],
    patch: [isBlogOwner()],
    remove: [isBlogOwner()]
  },

  after: {
    all: [],
    find: [attachUserToBlogs()],
    get: [attachUserToBlogs()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
