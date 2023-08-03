// import connectDb from '@/db/connectDb';
// import Listing from '@/db/models/listing';
import type { NextApiRequest, NextApiResponse } from 'next'
import escapeStringRegexp from 'escape-string-regexp';
import { z } from "zod";

const ITEMS_PER_PAGE = 20;

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const page = Math.abs(Number(req.query.page)) || 1;
//     const search = (req.query.search) as string || '';
//     const minPrice = Math.abs(Number(req.query.minPrice)) || 0;
//     let maxPrice = Math.abs(Number(req.query.maxPrice)) || 0;

//     const $regex = escapeStringRegexp(search.toString());

//     // Put all your query params in here
//     let query: any = {};

//     if (minPrice) query.price = { $gte: minPrice };
//     if (maxPrice && maxPrice > minPrice) query.price = { ...query.price, $lte: maxPrice };

//     if (search) {
//         query = {
//             ...query,
//             address: { $regex, $options: 'i' },
//         };
//     }

//     // console.log(query);

//     try {
//         await connectDb();
//         const skip = Math.abs(Number(page) - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

//         let countPromise;

//         if (Object.keys(query).length !== 0) {
//             countPromise = Listing.countDocuments(query);
//         } else {
//             countPromise = Listing.estimatedDocumentCount(query);
//         }

//         const itemsPromise = Listing.find(query).limit(ITEMS_PER_PAGE).skip(skip);

//         const [count, items] = await Promise.all([countPromise, itemsPromise]);

//         const pageCount = Math.ceil(count / ITEMS_PER_PAGE); // 400 items / 20 = 20

//         res.status(200).json({
//             pagination: {
//                 currentPage: Number(page),
//                 count,
//                 pageCount,
//             },
//             items,
//         })
//     } catch (e) {
//         console.error(e);
//         res.status(400).json({ e });
//     }

// }

//convert mongoose to prisma
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const querySchema = z.object({
        page: z.number().int().min(1).optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        minPrice: z
            .number()
            .int()
            .min(0)
            .optional(),
        maxPrice: z
            .number()
            .int()
            .min(0)
            .optional(),
    });

    try {
        const data = querySchema.parse(req.query)

        const { page = 1, state = '', city = '', minPrice = 0, maxPrice = 0 } = data;


    } catch (error) {
        return res.status(400).send({
            message: `Invalid query params`
        });
    }

    // const page = Math.abs(Number(req.query.page)) || 1;
    // const state = (req.query.state) as string || '';
    // const city = (req.query.city) as string || '';
    // const minPrice = Math.abs(Number(req.query.minPrice)) || 0;
    // let maxPrice = Math.abs(Number(req.query.maxPrice)) || 0;

    // const $regex = escapeStringRegexp(search.toString());

    // Put all your query params in here
    let query: any = {};

    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice && maxPrice > minPrice) query.price = { ...query.price, $lte: maxPrice };

    if (search) {
        query = {
            ...query,
            address: { $regex, $options: 'i' },
        };
    }

    // console.log(query);

    try {
        await connectDb();
        const skip = Math.abs(Number(page) - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

        let countPromise;

        if (Object.keys(query).length !== 0) {
            countPromise = Listing.countDocuments(query);
        } else {
            countPromise = Listing.estimatedDocumentCount(query);
        }

        const itemsPromise = Listing.find(query).limit(ITEMS_PER_PAGE).skip(skip);

        const [count, items] = await Promise.all([countPromise, itemsPromise]);

        const pageCount = Math.ceil(count / ITEMS_PER_PAGE); // 400 items / 20 = 20

        res.status(200).json({
            pagination: {
                currentPage: Number(page),
                count,
                pageCount,
            },
            items,
        })
    } catch (e) {
        console.error(e);
        res.status(400).json({ e });
    }

}
