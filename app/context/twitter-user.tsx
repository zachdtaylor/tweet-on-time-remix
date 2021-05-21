import React from "react";
import type { TwitterUser } from "../utils/twitter-client";

const TwitterUserContext = React.createContext<TwitterUser | null>(null);

type TwitterUserProviderProps = {
  user: TwitterUser;
  children: React.ReactNode;
};

export function TwitterUserProvider(props: TwitterUserProviderProps) {
  return (
    <TwitterUserContext.Provider value={props.user}>
      {props.children}
    </TwitterUserContext.Provider>
  );
}

export function useTwitterUser() {
  const context = React.useContext(TwitterUserContext);
  if (context === undefined) {
    throw new Error("useTwitterUser must be used within TwitterUserProvider");
  }
  return context;
}
