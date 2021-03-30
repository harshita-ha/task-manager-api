"use strict";

var request = require('supertest');

var app = require('../src/app');

var User = require('../src/models/user');

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
test('Should signup new user', function _callee() {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(request(app).post('/users').send({
            name: 'Harshita HAzarika',
            email: 'hoho@gmail.com',
            password: 'dinfifn32r'
          }).expect(201));

        case 2:
          response = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
test('Should login existing user ', function _callee2() {
  var response, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(request(app).post('/users/login').send({
            email: userOne.email,
            password: userOne.password
          }).expect(200));

        case 2:
          response = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findById(userOneId));

        case 5:
          user = _context2.sent;
          expect(user).not.toBeNull();
          expect(response.body.token).toBe(user.tokens[1].token);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
test('Should get profile for authenticated user', function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(request(app).get('/users/me').set('Authorization', "Bearer ".concat(userOne.tokens[0].token)).send().expect(200));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
test('Should delete account for user', function _callee4() {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(request(app)["delete"]('/users/me').set('Authorization', "Bearer ".concat(userOne.tokens[0].token)).send().expect(200));

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findById(userOneId));

        case 4:
          user = _context4.sent;
          expect(user).toBeNull();

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
test('Should not delete account for unauthenticated user', function _callee5() {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(request(app)["delete"]('/users/me').send().expect(401));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Path starts from the root of the project 

test('Should upload avatar image', function _callee6() {
  var user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(request(app).post('/users/me/avatar').set('Authorization', "Bearer ".concat(userOne.tokens[0].token)).attach('avatar', 'tests/fixtures/profile-pic.jpg').expect(200));

        case 2:
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.findById(userOneId));

        case 4:
          user = _context6.sent;
          expect(user.avatar).toEqual(expect.any(Buffer));

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
test('Should update', function _callee7() {
  var user;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(request(app).patch('/users/me').set('Authorization', "Bearer ".concat(userOne.tokens[0].token)).send({
            name: 'Harshitaaaaaa'
          }).expect(200));

        case 2:
          _context7.next = 4;
          return regeneratorRuntime.awrap(User.findById(userOneId));

        case 4:
          user = _context7.sent;
          expect(user.name).toEqual('Harshitaaaaaa');

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});