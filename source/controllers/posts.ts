import { Request, Response, NextFunction } from 'express'
import axios, { Axios, AxiosResponse } from 'axios'

interface Post {
    userId: Number
    id: Number
    title: String
    body: String
}

// GET ALL POSTS

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    let posts: [Post] = result.data

    return res.status(200).json({
        message: posts
    })
}

// GET ONE POST

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // Get post ID from request
    let id: string = req.params.id
    // Get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    let post: Post = result.data

    return res.status(200).json({
        message: post
    })
}

// UPDATE A POST

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id
    // Get data from request body
    let title: string = req.body.title ?? null
    let body: string = req.body.body ?? null
    // Update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    })

    return res.status(200).json({
        message: response.data
    })
}

// DELETE A POST

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

    return res.status(200).json({
        message: 'Post deleted successfully.'
    })
}

// ADD A POST

const addPost = async (req: Request, res: Response, next: NextFunction) => {
    let title: string = req.body.title
    let body: string = req.body.body

    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    })

    return res.status(200).json({
        message: response.data
    })
}

export default { getPosts, getPost, updatePost, deletePost, addPost }