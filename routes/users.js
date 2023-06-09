const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { userModel } = require('../db/mdl_user');

// Get all topic
router.get('/', async function (req, res, next) {
    try {
        const users = await userModel.list();
        res.json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// get one topic
router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const users = await userModel.findById(id);
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// insert new topic
router.post('/',
    // middleware validate
    body('name')
        .isLength({ min: 5, max: 50 })
        .withMessage('must be from 5 - 50 chars long')
        .trim()
        .escape(),
    body('password')
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
        const newUser = {
            name: body.name,
            password: body.password,
        };
        try {
            const topic = await userModel.insert(newUser);
            res.status(201).json(topic);
        } catch (error) {
            next(error);
        }
    });

// update topic
router.put('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const users = await userModel.edit(id, req.body);
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// delete topic
router.delete('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const users = await userModel.del(id);
        if (users.deletedCount === 0) {
            return res.status(404).send('Not found');
        }
        res.json(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;