import { Tag } from '@prisma/client';

interface TagObj {
    reviewId: string;
    tagId: number;
    tag: Tag;
}

export function calculateTagUsage(
    prevTags: TagObj[] | undefined,
    newTags: TagObj[]
) {
    const resultArr = [];
    const hashMap = new Map();

    if (!prevTags) {
        for (const tagObj of newTags) {
            resultArr.push({ id: tagObj.tag.tag_id, increase: true });
        }
        return resultArr;
    }

    for (const tagObj of prevTags) {
        hashMap.set(tagObj.tag.tag_name, tagObj.tag.tag_id);
    }
    for (const tagObj of newTags) {
        if (hashMap.has(tagObj.tag.tag_name)) {
            hashMap.delete(tagObj.tag.tag_name);
        } else {
            resultArr.push({ id: tagObj.tag.tag_id, increase: true });
        }
    }
    for (const id of hashMap.values()) {
        resultArr.push({ id, increase: false });
    }

    return resultArr;
}
