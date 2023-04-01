const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { blogModel } = require('../db/mdl_blog');

// Get all topic
router.get('/', async function (req, res, next) {
    try {
        const blogs = await blogModel.list();
        res.json(blogs);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// get one topic
router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const blogs = await blogModel.findById(id);
        res.json(blogs);
    } catch (error) {
        next(error);
    }
});

// insert new topic
router.post('/',
    // middleware validate
    body('title')
        .isLength({ min: 5, max: 50 })
        .withMessage('must be from 5 - 50 chars long')
        .trim()
        .escape(),
    body('content')
        .isLength({ min: 5 })
        .withMessage('must be from 5 - 50 chars long')
        .trim()
        .escape(),
    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        const newBlog = {
            title: body.title,
            content: body.content,
            creatBy: body.creatBy,
            topicList: body.topicList,
        };
        try {
            const topic = await blogModel.insert(newBlog);
            res.status(201).json(topic);
        } catch (error) {
            next(error);
        }
    });

// update topic
router.put('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const blogs = await blogModel.edit(id, req.body);
        res.json(blogs);
    } catch (error) {
        next(error);
    }
});

// delete topic
router.delete('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const blogs = await blogModel.del(id);
        if (blogs.deletedCount === 0) {
            return res.status(404).send('Not found');
        }
        res.json(blogs);
    } catch (error) {
        next(error);
    }
});

module.exports = router;