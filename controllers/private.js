const Blog = require('../models/Blog');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "You got the access"
    });
};

exports.getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        next(error);
    }

    if(!blogs){
        return next(new ErrorResponse("No Blogs Found!", 400));
    }
    return res.status(200).json({
        // success: true,
        blogs
    });
}

exports.addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try {
        await blog.save();
    } catch (error) {
        next(error);
        return res.status(500).json({message: error});
    }
    return res.status(200).json({blog});
}

exports.updateBlog = async (req, res, next) => {
    const { title, description, image } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
            image
        });
    } catch (error) {
        next(error);
    }

    if(!blog){
        return next(new ErrorResponse("Blog not found!", 401));
    }
    return res.status(200).json({blog});
}

exports.getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        next(error);
    }

    if(!blog){
        return next(new ErrorResponse("No Blog Found!", 400));
    }
    return res.status(200).json({blog});
}

exports.deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id);
    } catch (error) {
        next(error);
    }

    if(!blog){
        return next(new ErrorResponse("No Blog Found to Delete!", 400));
    }
    return res.status(200).json({message: "Successfully deleted!"});
}