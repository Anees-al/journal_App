import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.AUTH_USER && password === process.env.AUTH_PASS) {
        res.status(200).json({ success: true, token: 'simple-token-anees' });
    } else {
        res.status(401).json({ success: false, error: 'Invalid Credentials' });
    }
});

export default router;
