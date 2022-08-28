const postsControllers = require('./posts.controller')

postsControllers.createPost
postsControllers.deletePost
postsControllers.editPost
postsControllers.getAllPosts
postsControllers.getPostByID

const getAll = (req, res) => {
    const data = postsControllers.getAllPosts()
    res.status(200).json({items: data.length, posts: data})
}

const getByID = (req, res) => {
    const id = req.params.id
    const data = postsControllers.getPostByID(id)

    if(data){
        res.status(200).json(data)
    } else {
        res.status(404).json({message: `Post whit ID ${id} does not exist`})
    }
}

const postCreation = (req, res) => {
    const data = req.body
    if(!data){
        return res.status(400).json({message: 'Missing Data'})
    }
    if(!data.title || !data.content || !data.header_image || !data.user_id){
        return res.status(400).json({message: 'All fields must be completed', fields: {
	        title: "string",
	        content:"string",
	        header_image: "url_to_img",
	        user_id: "uuid"
        }})
    } else {
        const response = postsControllers.createPost(data)
        return res.status(201).json({message: `Post created succesfully with id: ${response.id}`, user: response})
    }
}

const removePost = (req, res) => {
    const id = req.params.id
    const data = postsControllers.deletePost(id)

    if(data){
        return res.status(204).json()
    } else {
        return res.status(400).json({message: 'Invalid ID Post'})
    }
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body

    if(!Object.keys(data).length){
        return res.status(400).json({message: 'Missing Data'})
    } else if (!data.title || !data.content || !data.header_image || !data.user_id || !data.published){
        return res.status(400).json({message: 'All fields must be completed', fields: {
            title: "string",
	        content:"string",
	        header_image: "url_to_img",
	        user_id: "uuid",
            published: true
        }})
    } else {
        const response = postsControllers.editPost(id, data)
        return res.status(200).json({message: 'Post edit succesfully with', post: response})
    }
}

// Rutas protegidas para: 
//! /api/v1/users/me/posts

const editMyPost = (req, res) => {
    const id = req.post.id
    const data = req.body

    if(!Object.keys(data).length){
        return res.status(400).json({message: 'Missing Data'})
    } else if (!data.title || !data.content || !data.header_image || !data.user_id || !data.published){
        return res.status(400).json({message: 'All fields must be completed', fields: {
            title: "string",
	        content:"string",
	        header_image: "url_to_img",
	        user_id: "uuid",
            published: true
        }})
    } else {
        const response = postsControllers.editPost(id, data)
        return res.status(200).json({message: 'Post edit succesfully with', post: response})
    }
}

const getMyPost = (req, res) => {
    const data = postsControllers.getAllPosts()
    res.status(200).json({items: data.length, posts: data})
}

const removeMyPost = (req, res) => {
    const id = req.post.id
    const data = postsControllers.deletePost(id)

    if(data){
        return res.status(204).json()
    } else {
        return res.status(400).json({message: 'Post is not published'})
    }
}

module.exports = {
    getAll,
    getByID,
    postCreation,
    removePost,
    edit,
    editMyPost,
    getMyPost,
    removeMyPost
}