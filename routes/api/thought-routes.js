const router = require('express').Router();

const {
    addThought,
    allThought,
    oneThought,
    removeThought
} = require('../../controllers/thought-controller.js')

    // using callbacks

    // at api/thoughts
router
    .route('/')
    .get(allThought)

    // at api/thoughts/
router
    .route('/:id')
    .get(oneThought)

    // /api/thoughts/:userId
router.route('/:userId').post(addThought);

router
    .route('/:userId/:thoughtId')
    .delete(removeThought)

module.exports = router;