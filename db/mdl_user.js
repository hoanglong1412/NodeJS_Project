const mongoose = require('mongoose');
const shortid = require('shortid');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },      
        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: 'user' }
); // avoid auto create modle

const userModel = mongoose.model('users', userSchema);

// Delete
exports.userModel = {
    async findById(id) {
        try {
            const users = await userModel.findById(id).exec();
            return users;
        }
        catch (error) {
            throw new Error(error);
        }
    },

    async edit(id, data) {
        try {
            const topic = await userModel.updateOne({ _id: id }, data);
            return topic;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    async list() {
        try {
            const users = await userModel.find({});
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },

    async insert(data) {
        try {
            const topic = new userModel(data);
            const result = await topic.save();
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async del(id) {
        try {
            const users = await userModel.deleteOne({ _id: id });
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },
};