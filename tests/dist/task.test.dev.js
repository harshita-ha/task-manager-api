"use strict";

var request = require('supertest');

var app = require('../src/app');

var Tasks = require('../src/models/task');

var _require = require('./fixtures/db'),
    userOneId = _require.userOneId,
    userTwoId = _require.userTwoId,
    userOne = _require.userOne,
    userTwo = _require.userTwo,
    taskOne = _require.taskOne,
    taskTwo = _require.taskTwo,
    taskThree = _require.taskThree,
    setUpDatabase = _require.setUpDatabase;

beforeEach(setUpDatabase);
test('Should create a new task', function _callee() {
  var response, task;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(request(app).post('/tasks').set('Authorization', "Bearer ".concat(userOne.tokens[0].token)).send({
            description: 'This test should work'
          }).expect(201));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Tasks.findById(response.body._id));

        case 5:
          task = _context.sent;
          expect(task).not.toBeNull();
          expect(task.completed).toEqual(false);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
test('Should get all tasks for logged in user', function _callee2() {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(request(app).get('/tasks').set('Authorization', "Bearer ".concat(userOne.tokens[0].token)).send().expect(200));

        case 2:
          response = _context2.sent;
          expect(response.body.length).toEqual(2);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
test('Task deletion security', function _callee3() {
  var response, task;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(request(app)["delete"]("/tasks/".concat(taskOne._id)).set('Authorization', "Bearer ".concat(userTwo.tokens[0].token)).send().expect(404));

        case 2:
          response = _context3.sent;
          task = Tasks.findById(taskOne._id);
          expect(task).not.toBeNull();

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});