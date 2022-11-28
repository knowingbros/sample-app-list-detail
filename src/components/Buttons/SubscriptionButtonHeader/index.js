import React from "react";

import "./styles.css";
import {withEither, withMaybe} from "../../../utilities/HOC";
import {SubscribeBtnHeader} from "../../UserButton/UserButton.styles";

const SubscribeButton = ({makeSubscriptionRequest, subredditTitle}) => (
    <SubscribeBtnHeader
        className="subscribe-button"
        onClick={() => makeSubscriptionRequest(subredditTitle, "sub")}
    >
        Subscribe
    </SubscribeBtnHeader>
);

const UnSubscribeButton = ({makeSubscriptionRequest, subredditTitle}) => (
    <SubscribeBtnHeader
        className="subscribe-button"
        onClick={() => makeSubscriptionRequest(subredditTitle, "unsub")}
    >
        Unsubscribe
    </SubscribeBtnHeader>
);

const subscriptionConditionFn = props =>
    props.userSubscriptions.includes(props.subredditTitle);
const authenticatedConditionFn = props => props.authenticatedUsername;

const c1 = withMaybe(authenticatedConditionFn);
const c2 = withEither(subscriptionConditionFn, UnSubscribeButton);

const SubscriptionButtonHeader = c1(c2(SubscribeButton));

// const SubscriptionButton = compose(
//   withMaybe(authenticatedConditionFn),
//   withEither(subscriptionConditionFn, UnSubscribeButton)
// )(SubscribeButton);

export default SubscriptionButtonHeader;
