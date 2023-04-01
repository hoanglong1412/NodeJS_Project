const express = require('express');
const router = express.Router();
const {topicModel} = require('../db/mdl_topic');

// Get all topic
router.get('/', async function (req, res, next) {
  try {
    const topics = await topicModel.list();
    res.json(topics);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// get one topic
router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    const topics = await topicModel.findById(id);
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

// insert new topic
router.post('/', async function (req, res, next) {
  const body = req.body;
  const newTopic = {
    name: body.name,
  };
  try {
    const topic = await topicModel.insert(newTopic);
    res.status(201).json(topic);
  } catch (error) {
    next(error);
  }
});

// update topic
router.put('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    const topics = await topicModel.edit(id, req.body); 
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

// delete topic
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    const topics = await topicModel.del(id);
    if (topics.deletedCount === 0) {
      return res.status(404).send('Not found');
    }
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

// delete all topic
router.delete('/', async function (req, res, next) {
  try {
    const topics = await topicModel.delAll({});
    if (topics.deletedCount === 0) {
      return res.status(404).send('Not found');
    }
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

module.exports = router;