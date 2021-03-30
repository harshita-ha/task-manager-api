const request = require('supertest');
const app = require('../src/app');
const Tasks = require('../src/models/task');
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

test('Should create a new task', async() => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'This test should work'
        })
        .expect(201);

    const task = await Tasks.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
})

test('Should get all tasks for logged in user', async() => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    expect(response.body.length).toEqual(2);

});

test('Task deletion security', async() => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = Tasks.findById(taskOne._id);
    expect(task).not.toBeNull();
});