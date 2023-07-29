import connectDb from '@/db/connectDb';
import Agent from '@/db/models/agent';
import Listing from '@/db/models/listing';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { id },
        method,
    } = req;
    await connectDb();

    switch (method) {
        case 'GET' /* Get a model by its ID */:
            try {
                // const listing = await Listing.findById(id).populate('agent', { phone: 1 });
                const listing = await Listing.findById(id);
                const agent = await Agent.findOne({ phone: listing.agentContact });
                if (!listing) {
                    return res.status(404).json({ error: 'Listing does not exist' });
                }

                if (!agent) {
                    // return res.status(404).json({ error: 'Agent does not exist' });
                    return res.status(200).json({ data: { listing } });
                }

                res.status(200).json({ data: { listing, agent: agent.id } });
            } catch (error) {
                res.status(400).json({ error });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
