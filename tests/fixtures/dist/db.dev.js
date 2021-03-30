"use strict";

var User = require('../../src/models/user');

var Tasks = require('../../src/models/task');

var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

var userOneId = new mongoose.Types.ObjectId();
var userTwoId = new mongoose.Types.ObjectId();
var userOne = {
  _id: userOneId,
  name: 'Mike Mead',
  email: 'mikemead@gmail.com',
  password: 'iamawesome!!',
  tokens: [{
    token: jwt.sign({
      _id: userOneId
    }, process.env.JWT_SECRET)
  }]
};
var userTwo = {
  _id: userTwoId,
  name: 'Andrewwwww Mead',
  email: 'mikeansdrmead@gmail.com',
  password: 'iamaweefsome!!',
  tokens: [{
    token: jwt.sign({
      _id: userTwoId
    }, process.env.JWT_SECRET)
  }]
};
var taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Task One',
  completed: false,
  owner: userOne._id
};
var taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Task Two',
  completed: false,
  owner: userOne._id
};
var taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Task Three',
  completed: false,
  owner: userTwo._id
};

var setUpDatabase = function setUpDatabase() {
  return regeneratorRuntime.async(function setUpDatabase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.deleteMany());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(Tasks.deleteMany());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(new User(userOne).save());

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(new User(userTwo).save());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(new Tasks(taskOne).save());

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(new Tasks(taskTwo).save());

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(new Tasks(taskThree).save());

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  userOneId: userOneId,
  userTwoId: userTwoId,
  userOne: userOne,
  userTwo: userTwo,
  taskOne: taskOne,
  taskTwo: taskTwo,
  taskThree: taskThree,
  setUpDatabase: setUpDatabase
};