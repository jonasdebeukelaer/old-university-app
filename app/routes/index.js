const token = require('../security/token');
const register = require('./register');
const permissions = require('../security/permissions');
const crud = require('./crud');
const router  = require('express').Router();


// Authentication
router.post('/register', register.setup);
router.get('/verify', register.verify);
router.post('/login', token.serialize, token.generateToken, token.returnToken, token.loginError);

// User data
router.get('/user', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('user'), permissions.verifyUserReadAccess, permissions.permissionError,
    crud.getAllUsers);

router.get('/user/:uid', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('user'), permissions.verifyUserReadAccess, permissions.permissionError,
    crud.getUserData);

router.get('/user/:uid/:field', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('user'), permissions.verifyUserReadAccess, permissions.permissionError,
    crud.getUserData);

router.post('/user/:uid', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('user'), permissions.verifyUserWriteAccess, permissions.permissionError,
    crud.updateUserData);

router.delete('/user/:uid', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('user'), permissions.verifyDeleteAccess('user'), permissions.permissionError,
    crud.deleteUser);

// Post data
router.get('/posts/:postId', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('posts'), permissions.verifyPostAccess('view'), permissions.permissionError,
    crud.getPost);

router.get('/posts/user/:uid', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('posts'), permissions.verifyPostAccess('view'), permissions.permissionError,
    crud.getUserPosts);

router.post('/posts/:postId', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('posts'), permissions.verifyPostAccess('edit'), permissions.permissionError,
    crud.editPost);

router.post('/posts/user/:uid', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('posts'), permissions.verifyPostAccess('edit'), permissions.permissionError,
    crud.addPost);

router.delete('/posts/:postId', token.verifyToken, permissions.filterBanned,
    permissions.setRoles('posts'), permissions.verifyDeleteAccess('posts'), permissions.permissionError,
    crud.deletePost);

module.exports = router;