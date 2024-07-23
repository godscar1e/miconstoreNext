export default function handler(req, res) {
    const isHomePage = req.url === '/';
    res.status(200).json({ isHomePage });
}