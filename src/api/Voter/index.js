import axios from 'axios';

import {VOTE_URL,} from '../constants';
import {tokenContextObj} from '../apiUtils';

export const voteApi = (voteData, token) => {
    // voteType: upvote(1), downvote(-1) or unvote(0)
    // itemType: 'post' or 'comment'
    // itemPk: pk of post or comment
    const {
        itemType,
        itemPk: pk,
        voteType,
    } = voteData;

    let itemFn = null;
    if (itemType === 'comment') {
        itemFn = `t1_${pk}`
    } else if (itemType === 'post') {
        itemFn = `t2_${pk}`
    } else if (itemType === 'pxulw') {
        itemFn = `t2_${pk}`
    }
    ;

    const data = {vote_type: voteType, item_fn: itemFn};
    return axios.post(VOTE_URL, data, tokenContextObj(token))
        .then(response => response.data)
}
