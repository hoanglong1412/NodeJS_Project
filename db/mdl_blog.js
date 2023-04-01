const mongoose = require('mongoose');
const shortid = require('shortid');

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },      
        content: {
            type: String,
            required: true,
            trim: true,
        },
        creatBy: {
            type: String,
            required: true,
            trim: true,
        },
        creatAt: {
            type: Date,
            default: new Date(+new Date() + 7*24*60*60*1000),
        },
        topicList: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: 'blog' }
); // avoid auto create modle

const blogModel = mongoose.model('blogs', blogSchema);

// Delete
exports.blogModel = {
    async findById(id) {
        try {
            const blogs = await blogModel.findById(id).exec();
            return blogs;
        }
        catch (error) {
            throw new Error(error);
        }
    },

    async edit(id, data) {
        try {
            const topic = await blogModel.updateOne({ _id: id }, data);
            return topic;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    async list() {
        try {
            const blogs = await blogModel.find({});
            return blogs;
        } catch (error) {
            throw new Error(error);
        }
    },

    async insert(data) {
        try {
            const topic = new blogModel(data);
            const result = await topic.save();
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async del(id) {
        try {
            const blogs = await blogModel.deleteOne({ _id: id });
            return blogs;
        } catch (error) {
            throw new Error(error);
        }
    },
};