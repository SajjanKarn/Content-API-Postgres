import { Post, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreatePost } from "../types/post.types";
import { UserRequest } from "../types/auth.types";

const postClient = new PrismaClient().post;

// get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts: Post[] = await postClient.findMany();
    return res.status(200).json(posts);
  } catch (error) {
    throw error;
  }
};

// get post
export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw "Post id is required";

  try {
    const post: Post | null = await postClient.findUnique({
      where: {
        id,
      },
    });

    if (!post) throw "Post not found";

    return res.status(200).json(post);
  } catch (error) {
    throw error;
  }
};

// create post

export const createPost = async (req: UserRequest, res: Response) => {
  const { title, content }: CreatePost = req.body;

  if (!title || !content) throw "Title and content are required";

  try {
    const post: Post = await postClient.create({
      data: {
        title,
        content,
        userId: req.user.id,
      },
    });
    return res.status(201).json(post);
  } catch (error) {
    throw error;
  }
};

// update post
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content }: CreatePost = req.body;

  if (!id) throw "Post id is required";
  if (!title || !content) throw "Title and content are required";

  try {
    const post: Post = await postClient.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    throw error;
  }
};

// delete post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw "Post id is required";

  try {
    await postClient.delete({
      where: {
        id,
      },
    });

    return res.status(204).json("Post deleted successfully");
  } catch (error) {
    throw error;
  }
};

// publish post
export const publishPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw "Post id is required";

  try {
    const post: Post = await postClient.update({
      where: {
        id,
      },
      data: {
        published: true,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    throw error;
  }
};
