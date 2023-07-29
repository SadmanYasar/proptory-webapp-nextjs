import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import Admin from '@/db/models/admin';
import connectDb from '@/db/connectDb';

// TODO - ONLY ADMIN CAN ADD OTHER ADMINS
/*  
    TODO - NEED TO KEEP A LIST OF ALLOWED ADMINS BY THEIR EMAILS. 
    TODO - THEN SECURITY CODE CAN BE SENT BY EMAIL OR PHONE NUMBER
    Once they receive code, show form to add password
    After that, they login with username and password
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username, password } = req.body;
    const { method } = req;

    const saltRounds = 10;

    await connectDb();

    switch (method) {
        case 'POST':
            try {
                const admin = await Admin.find({});

                const passwordHash = await bcrypt.hash(password, saltRounds);
                const newAdmin = new Admin({ username, password: passwordHash, role: 'ADMIN' });
                await newAdmin.save()
                return res.status(200).send({ message: 'Created' });
                // if (admin.length === 0) {
                // } else {
                //     throw new Error('Unauthorized');
                // }
            } catch (error) {
                res.status(401).json({ message: 'Unauthorized' });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
