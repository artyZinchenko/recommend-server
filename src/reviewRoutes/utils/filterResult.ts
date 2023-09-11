import { Review } from '@prisma/client';

export function filterResult(arr: Review[]) {
    const idMap = new Map();
    const res = [];

    for (const review of arr) {
        if (!idMap.has(review.review_id)) {
            idMap.set(review.review_id, true);
            res.push(review);
        } else continue;
    }

    return res;
}
