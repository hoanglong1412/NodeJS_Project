const mongoose = require('mongoose');
const shortid = require('shortid');

const topicSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: 'topics' }
); // avoid auto create modle

const topicModel = mongoose.model('topics', topicSchema);

// Delete
exports.topicModel = {
    async findById(id) {
        try {
            const topics = await topicModel.findById(id).exec();
            return topics;
        }
        catch (error) {
            throw new Error(error);
        }
    },

    async edit(id, data) {
        try {
            const topic = await topicModel.updateOne({ _id: id }, data);
            return topic;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    async list() {
        try {
            const topics = await topicModel.find({});
            return topics;
        } catch (error) {
            throw new Error(error);
        }
    },

    async insert(data) {
        try {
            const topic = new topicModel(data);
            const result = await topic.save();
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async del(id) {
        try {
            const topics = await topicModel.deleteOne({ _id: id });
            return topics;
        } catch (error) {
            throw new Error(error);
        }
    },

    async delAll() {
        try {
            const topics = await topicModel.deleteMany({});
            return topics;
        } catch (error) {
            throw new Error(error);
        }
    },
};