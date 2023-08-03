/* eslint-disable */
import type { Prisma, Listing } from '@prisma/client';
import { useContext } from 'react';
import { RequestHandlerContext, type RequestOptions, type PickEnumerable } from '@zenstackhq/swr/runtime';
import * as request from '@zenstackhq/swr/runtime';

export function useMutateListing() {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const prefixesToMutate = [
        `${endpoint}/listing/find`,
        `${endpoint}/listing/aggregate`,
        `${endpoint}/listing/count`,
        `${endpoint}/listing/groupBy`,
    ];
    const mutate = request.getMutate(prefixesToMutate);

    async function createListing<T extends Prisma.ListingCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.ListingCreateArgs>,
    ) {
        return await request.post<Prisma.CheckSelect<T, Listing, Prisma.ListingGetPayload<T>>, true>(
            `${endpoint}/listing/create`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function createManyListing<T extends Prisma.ListingCreateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.ListingCreateManyArgs>,
    ) {
        return await request.post<Prisma.BatchPayload, false>(
            `${endpoint}/listing/createMany`,
            args,
            mutate,
            fetch,
            false,
        );
    }

    async function updateListing<T extends Prisma.ListingUpdateArgs>(
        args: Prisma.SelectSubset<T, Prisma.ListingUpdateArgs>,
    ) {
        return await request.put<Prisma.ListingGetPayload<T>, true>(
            `${endpoint}/listing/update`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function updateManyListing<T extends Prisma.ListingUpdateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.ListingUpdateManyArgs>,
    ) {
        return await request.put<Prisma.BatchPayload, false>(
            `${endpoint}/listing/updateMany`,
            args,
            mutate,
            fetch,
            false,
        );
    }

    async function upsertListing<T extends Prisma.ListingUpsertArgs>(
        args: Prisma.SelectSubset<T, Prisma.ListingUpsertArgs>,
    ) {
        return await request.post<Prisma.ListingGetPayload<T>, true>(
            `${endpoint}/listing/upsert`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function deleteListing<T extends Prisma.ListingDeleteArgs>(
        args: Prisma.SelectSubset<T, Prisma.ListingDeleteArgs>,
    ) {
        return await request.del<Prisma.ListingGetPayload<T>, true>(
            `${endpoint}/listing/delete`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function deleteManyListing<T extends Prisma.ListingDeleteManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.ListingDeleteManyArgs>,
    ) {
        return await request.del<Prisma.BatchPayload, false>(
            `${endpoint}/listing/deleteMany`,
            args,
            mutate,
            fetch,
            false,
        );
    }
    return {
        createListing,
        createManyListing,
        updateListing,
        updateManyListing,
        upsertListing,
        deleteListing,
        deleteManyListing,
    };
}

export function useFindManyListing<T extends Prisma.ListingFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.ListingFindManyArgs>,
    options?: RequestOptions<Array<Prisma.ListingGetPayload<T>>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<Array<Prisma.ListingGetPayload<T>>>(`${endpoint}/listing/findMany`, args, options, fetch);
}

export function useFindUniqueListing<T extends Prisma.ListingFindUniqueArgs>(
    args?: Prisma.SelectSubset<T, Prisma.ListingFindUniqueArgs>,
    options?: RequestOptions<Prisma.ListingGetPayload<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<Prisma.ListingGetPayload<T>>(`${endpoint}/listing/findUnique`, args, options, fetch);
}

export function useFindFirstListing<T extends Prisma.ListingFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.ListingFindFirstArgs>,
    options?: RequestOptions<Prisma.ListingGetPayload<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<Prisma.ListingGetPayload<T>>(`${endpoint}/listing/findFirst`, args, options, fetch);
}

export function useAggregateListing<T extends Prisma.ListingAggregateArgs>(
    args?: Prisma.Subset<T, Prisma.ListingAggregateArgs>,
    options?: RequestOptions<Prisma.GetListingAggregateType<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<Prisma.GetListingAggregateType<T>>(`${endpoint}/listing/aggregate`, args, options, fetch);
}

export function useGroupByListing<
    T extends Prisma.ListingGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.ListingGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.ListingGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
              [P in HavingFields]: P extends ByFields
                  ? never
                  : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
              [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
>(
    args?: Prisma.SubsetIntersection<T, Prisma.ListingGroupByArgs, OrderByArg> & InputErrors,
    options?: RequestOptions<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.ListingGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.ListingGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.ListingGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.ListingGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.ListingGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.ListingGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.ListingGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.ListingGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >(`${endpoint}/listing/groupBy`, args, options, fetch);
}

export function useCountListing<T extends Prisma.ListingCountArgs>(
    args?: Prisma.Subset<T, Prisma.ListingCountArgs>,
    options?: RequestOptions<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ListingCountAggregateOutputType>
            : number
    >,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ListingCountAggregateOutputType>
            : number
    >(`${endpoint}/listing/count`, args, options, fetch);
}
