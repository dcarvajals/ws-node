const express = require('express');
const router = express.Router();

const user_controller = require('../controller/user_controller');

//routes
router.get('/getCards/:id', user_controller.getCards);

router.get('/deleteCard/:id', user_controller.delete_card);

router.get('/getSession', user_controller.ensureToken, user_controller.protected);

router.post('/login', user_controller.login);

router.post('/newCard', user_controller.insertCard);

module.exports = router;