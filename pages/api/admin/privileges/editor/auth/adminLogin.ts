import connectDb from '@/db/connectDb';
import Admin from '@/db/models/admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username, password } = req.body;
    const { method } = req;
    await connectDb();

    switch (method) {
        case 'POST':
            const foundAdmin = await Admin.findOne({ username });

            const passwordMatch = foundAdmin === null
                ? false
                : await bcrypt.compare(password, foundAdmin.password);

            if (!foundAdmin || !passwordMatch) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const adminForToken = {
                username: foundAdmin.username,
                id: foundAdmin._id,
            }

            res.status(200).json({ id: foundAdmin._id, value: jwt.sign(adminForToken, process.env.JWT_SECRET_ADMIN!) });
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
