"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishPost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getAllPosts = void 0;
const client_1 = require("@prisma/client");
const postClient = new client_1.PrismaClient().post;
// get all posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postClient.findMany();
        return res.status(200).json(posts);
    }
    catch (error) {
        throw error;
    }
});
exports.getAllPosts = getAllPosts;
// get post
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw "Post id is required";
    try {
        const post = yield postClient.findUnique({
            where: {
                id,
            },
        });
        if (!post)
            throw "Post not found";
        return res.status(200).json(post);
    }
    catch (error) {
        throw error;
    }
});
exports.getPost = getPost;
// create post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content)
        throw "Title and content are required";
    try {
        const post = yield postClient.create({
            data: {
                title,
                content,
                userId: req.user.id,
            },
        });
        return res.status(201).json(post);
    }
    catch (error) {
        throw error;
    }
});
exports.createPost = createPost;
// update post
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!id)
        throw "Post id is required";
    if (!title || !content)
        throw "Title and content are required";
    const post = yield postClient.findUnique({
        where: {
            id,
        },
    });
    // match user id with post user id
    if ((post === null || post === void 0 ? void 0 : post.userId) !== req.user.id) {
        return res.status(403).json("Unauthorized");
    }
    try {
        const post = yield postClient.update({
            where: {
                id,
            },
            data: {
                title,
                content,
            },
        });
        return res.status(200).json(post);
    }
    catch (error) {
        throw error;
    }
});
exports.updatePost = updatePost;
// delete post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw "Post id is required";
    const post = yield postClient.findUnique({
        where: {
            id,
        },
    });
    // match user id with post user id
    if ((post === null || post === void 0 ? void 0 : post.userId) !== req.user.id) {
        return res.status(403).json("Unauthorized");
    }
    try {
        yield postClient.delete({
            where: {
                id,
            },
        });
        return res.status(204).json("Post deleted successfully");
    }
    catch (error) {
        throw error;
    }
});
exports.deletePost = deletePost;
// publish post
const publishPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw "Post id is required";
    const post = yield postClient.findUnique({
        where: {
            id,
        },
    });
    // match user id with post user id
    if ((post === null || post === void 0 ? void 0 : post.userId) !== req.user.id) {
        return res.status(403).json("Unauthorized");
    }
    try {
        const post = yield postClient.update({
            where: {
                id,
            },
            data: {
                published: true,
            },
        });
        return res.status(200).json(post);
    }
    catch (error) {
        throw error;
    }
});
exports.publishPost = publishPost;
