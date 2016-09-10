const db = require('../db');

// Database endpoints

function getUserData (req, res) {
    const uid = req.params.uid;
    db.getUserData(uid, req.targetFields).then(data =>{
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function getAllUsers (req, res) {
    const targetFields = req.targetFields;
    db.getAllUserData(targetFields).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function updateUserData (req, res) {
    const uid = req.params.uid;
    const data = req.data;
    db.updateUserData(uid, data).then(() => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send(err);
    });
}

function deleteUser (req, res) {
    const uid = req.params.uid;
    db.deleteUser(uid).then(() => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send(err);
    });
}

function getUserPosts (req, res) {
    const uid = req.params.uid;
    db.getPostsByUser(uid).then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
}

function getPost (req, res) {
    const postId = req.params.postId;
    db.getPost(postId).then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).send(err);
    });
}

function addPost (req, res) {
    const uid = req.params.uid;
    const post = req.content;
    db.addPost(uid, post).then(() => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send(err);
    });
}

function editPost (req, res) {
    const postId = req.params.postId;
    const post = req.content;
    db.editPost(postId, post).then(() => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send(err);
    });
}

function deletePost (req, res) {
    const postId = req.params.postId;
    db.deletePost(postId).then(() => {
        res.status(200).send();
    }).catch(err => {
        res.staus(500).send(err);
    });
}


module.exports = {
    getUserData: getUserData,
    updateUserData: updateUserData,
    getAllUsers: getAllUsers,
    getUserPosts: getUserPosts,
    deleteUser: deleteUser,
    getPost: getPost,
    addPost: addPost,
    editPost: editPost,
    deletePost: deletePost
};