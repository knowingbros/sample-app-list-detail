import React from "react";

import "./styles.css";
import {withEither, withMaybe} from "../../../utilities/HOC";
import {GenericBtn, SubscribeBtnSidebar} from "../../UserButton/UserButton.styles";

const SubscribeButton = ({ makeSubscriptionRequest, subredditTitle }) => (
  <SubscribeBtnSidebar
    className="subscribe-button"
    onClick={() => makeSubscriptionRequest(subredditTitle, "sub")}
  >
    Subscribe
  </SubscribeBtnSidebar>
);

const UnSubscribeButton = ({ makeSubscriptionRequest, subredditTitle }) => (
  <SubscribeBtnSidebar
    className="subscribe-button"
    onClick={() => makeSubscriptionRequest(subredditTitle, "unsub")}
  >
    Unsubscribe
  </SubscribeBtnSidebar>
);

const subscriptionConditionFn = props =>
  props.userSubscriptions.includes(props.subredditTitle);
const authenticatedConditionFn = props => props.authenticatedUsername;

const c1 = withMaybe(authenticatedConditionFn);
const c2 = withEither(subscriptionConditionFn, UnSubscribeButton);

const SubscriptionButton = c1(c2(SubscribeButton));

// const SubscriptionButton = compose(
//   withMaybe(authenticatedConditionFn),
//   withEither(subscriptionConditionFn, UnSubscribeButton)
// )(SubscribeButton);

export default SubscriptionButton;
