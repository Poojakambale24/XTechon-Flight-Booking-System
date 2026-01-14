// backend/controllers/walletController.js
const prisma = require('../db/prisma');

// GET /api/wallet
exports.getWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ wallet_balance: user.wallet_balance });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wallet', details: err.message });
  }
};
