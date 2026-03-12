export default function handler(req, res) {
    if (req.method === 'POST') {
        // Parse the incoming form data
        const body = JSON.parse(req.body);
        
        const username = body.ign;
        const item = body.item;
        const reference = body.ref;

        // In a real database scenario, you would save this to MongoDB/Supabase here.
        // For static Vercel, we simulate a successful submission:
        console.log(`New GCash Purchase: ${username} bought ${item}. Ref: ${reference}`);

        res.status(200).json({ 
            success: true, 
            message: `Thank you ${username}! Your request for ${item} has been sent to admins for GCash verification.` 
        });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}