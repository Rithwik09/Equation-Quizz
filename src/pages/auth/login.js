import { auth } from '../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const user = await auth().signInWithEmailAndPassword(email, password);
            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
