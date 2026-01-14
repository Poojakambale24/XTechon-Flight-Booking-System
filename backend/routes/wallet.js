// backend/routes/wallet.js
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { authRequired } = require('../middleware/auth');

router.get('/', authRequired, walletController.getWallet);

module.exports = router;
