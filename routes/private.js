const express = require('express');
const router = express.Router();
const { getPrivateData, getAllBlogs, addBlog, updateBlog, getById, deleteBlog } = require('../controllers/private');
const { protect } = require('../middleware/auth');

router.route("/").get(protect, getPrivateData);

router.route("/blogs").get(getAllBlogs);

router.route("/blogs/add").post(addBlog);

router.route("/blogs/update/:id").put(updateBlog);

router.route("/blogs/:id").get(getById);

router.route("/blogs/delete/:id").delete(deleteBlog);

module.exports = router;