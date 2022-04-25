const router = require('express').Router();

const { 
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
} = require('../../controllers/user-controller.js')

// using call backs
// at api/user
router
    .route('/')
    .get(getAllUser) // done
    .post(createUser); // done

// at api/user/:id
router
    .route('/:id')
    .get(getOneUser) // done
    .put(updateUser) // done
    .delete(deleteUser); // done

// /api/user/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend) // done
    .delete()

module.exports = router;