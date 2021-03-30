const User = require('../../src/models/user')
const Tasks = require('../../src/models/task')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'Mike Mead',
    email: 'mikemead@gmail.com',
    password: 'iamawesome!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwo = {
    _id: userTwoId,
    name: 'Andrewwwww Mead',
    email: 'mikeansdrmead@gmail.com',
    password: 'iamaweefsome!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task One',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Two',
    completed: false,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Three',
    completed: false,
    owner: userTwo._id
}

const setUpDatabase = async() => {
    await User.deleteMany();
    await Tasks.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Tasks(taskOne).save();
    await new Tasks(taskTwo).save();
    await new Tasks(taskThree).save();

}

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
}