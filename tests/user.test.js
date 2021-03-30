const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user')
const {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
} = require('./fixtures/db');

beforeEach(setUpDatabase);

test('Should signup new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Harshita HAzarika',
        email: 'hoho@gmail.com',
        password: 'dinfifn32r'
    }).expect(201);

});

test('Should login existing user ', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(userOneId);
    expect(user).not.toBeNull();
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should get profile for authenticated user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should delete account for user', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

//Path starts from the root of the project 
test('Should upload avatar image', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
})

test('Should update', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Harshitaaaaaa'
        })
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Harshitaaaaaa');
});