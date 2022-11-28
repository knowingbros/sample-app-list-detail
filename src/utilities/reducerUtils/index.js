// Help organize reducers
export function combineReducersWithRoot(rootReducer, reducers) {
    return (state, action) => {
        let newState = {...rootReducer(state, action)};
        Object.keys(reducers).forEach(prop => {
            let propObj = state ? state[prop] : undefined;
            newState[prop] = reducers[prop](propObj, action);
        });
        return newState;
    };
}

// Update, avoid mutation
export function updateObject(oldObject, newValues) {
    return {...oldObject, ...newValues};
}

// Pretty much just for comments and posts
export function updateObjectOnVote(oldObj, voteType) {

    if (oldObj !== undefined) {

        console.log(`XXX oldObj: ${JSON.stringify(oldObj)}`)
        console.log(`XXX oldObj: voteType ${JSON.stringify(voteType)}`)

        const voteState = oldObj.voteDisplayState || 0;

        const newVoteState = voteType;

        const upvotes = oldObj.upvotes;
        const newUpvotes = upvotes + (newVoteState - voteState);

        return {
            ...oldObj,
            voteDisplayState: newVoteState,
            upvotes: newUpvotes
        };
    }
}

// Take an array of serialized objects and return array of ids only
// maintaing order
export const allIds = (objList, idLabel = "pk") => {
    let allIds = [];
    if (objList !== undefined) {
        objList.forEach(obj => {
            allIds.push(obj[idLabel]);
        });
    }
    return allIds;
};

// Take an array of serialized objects and make a objectById object
// with the `idLabel` element as the object key
// if a modification is needed to each element you can pass updateFcn
export const objectById = (objList, updateFcn, idLabel = "pk") => {
    let objById = {};

    if (objList !== undefined) {

        objList.forEach(obj => {
            obj = updateFcn ? updateFcn(obj) : obj;
            objById[obj[idLabel]] = {...obj};
        });
    }
    return objById;
};

// post specific wrapper for objectById, need to rename some properties
export const postsById = postList =>
    objectById(postList, post => {
        const {vote_state, poster_username, subreddit_title, ...rest} = post;
        return {
            voteDisplayState: vote_state,
            posterUsername: poster_username,
            subredditTitle: subreddit_title,
            ...rest
        };
    });

export const pxulwsById = pxulwList =>
    objectById(pxulwList, pxulw => {
        const {vote_state, poster_username, subreddit_title, ...rest} = pxulw;
        return {
            voteDisplayState: vote_state,
            posterUsername: poster_username,
            subredditTitle: subreddit_title,
            ...rest
        };
    });