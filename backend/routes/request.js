const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requestController = require('../controller/requestController');

// Create a request
router.post('/', auth, requestController.createRequest);

// Get incoming requests for owner
router.get('/owner', auth, requestController.getRequestsForOwner);

// Get requests made by current user
router.get('/me', auth, requestController.getRequestsForRequester);

// Update request status (accept/decline)
router.patch('/:id', auth, requestController.updateRequestStatus);

module.exports = router;
