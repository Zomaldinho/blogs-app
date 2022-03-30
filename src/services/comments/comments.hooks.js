const { authenticate } = require('@feathersjs/authentication').hooks;

const isCommentOwner = require('../../hooks/is_comment_owner');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [isCommentOwner()],
    update: [],
    patch: [isCommentOwner()],
    remove: [isCommentOwner()]
  },

  after: {
    all: [],
    find: [],
    get: [],
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
