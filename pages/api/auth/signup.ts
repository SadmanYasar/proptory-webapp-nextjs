import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import Agent from '@/db/models/agent';
import connectDb from '@/db/connectDb';
import { toNewAgent } from '@/utils/typeCheckers';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const saltRounds = 10;

    await connectDb();

    try {
        const newAgent = toNewAgent(req.body);
        const passwordHash = await bcrypt.hash(newAgent.password, saltRounds);
        const agent = new Agent({ ...newAgent, password: passwordHash });
        await agent.save();
        res.status(200).send({ message: 'Created' });
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
            return res.status(400).send({ error: errorMessage });
        }

        return res.status(400).send({ error });
    }
}
