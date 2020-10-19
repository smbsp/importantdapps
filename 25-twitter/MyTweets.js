import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import TweetList from "./TweetList";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);
  console.log(state.accounts);
  return (
    <>
      <div>
        <h3>My Tweets</h3>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Tweeter"
          method="getTweetsOf"
          methodArgs={[drizzle.web3.eth.accounts.givenProvider.selectedAddress, 1]}
          render={tweets => <TweetList tweets={tweets} />}
        />
      </div>
    </>
  );
};