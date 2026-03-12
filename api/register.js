export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({ success: true, message: "Registration API endpoint active." });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}