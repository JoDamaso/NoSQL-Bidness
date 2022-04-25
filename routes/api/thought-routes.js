const router = require('express').Router();

const {
    addThought,
    allThought,
    oneThought,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller.js')

// using callbacks
// at api/thoughts
router
    .route('/')
    .get(allThought) // done

// at api/thoughts/
router
    .route('/:id')
    .get(oneThought) // done
    .put(updateThought) // done

// /api/thoughts/:userId
router.route('/:userId').post(addThought); // done

// /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(removeThought) // done

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction) // done

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;