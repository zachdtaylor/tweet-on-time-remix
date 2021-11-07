import React from "react";
import { NavLinkProps, NavLink, Outlet } from "react-router-dom";
import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import * as twitter from "../utils/twitter-client";
import type { TwitterUser } from "../utils/twitter-client";
import { TwitterUserProvider } from "../context/twitter-user";
import stylesUrl from "../styles/routes/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Tweet on Time",
    description: "Schedule your tweets.",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

interface IndexRouteData {
  user: TwitterUser;
}

export let loader: LoaderFunction = async () => {
  const user = await twitter.getUser();
  return {
    user,
  };
};

export default function Index() {
  const data = useRouteData<IndexRouteData>();
  return (
    <TwitterUserProvider user={data.user}>
      <div className="flex flex-col h-full">
        <NavBar />
        <main className="flex-auto">
          <Outlet />
        </main>
      </div>
    </TwitterUserProvider>
  );
}

function NavBar() {
  const data = useRouteData<IndexRouteData>();
  const [mobileMenuActive, setMobileMenuActive] = React.useState(false);
  return (
    <nav className="mx-auto w-full border-b-2 border-gray-800">
      <div className="flex flex-row justify-between shadow-md md:hidden">
        <div
          className="w-24 flex items-center"
          role="button"
          tabIndex={0}
          onClick={() => setMobileMenuActive(!mobileMenuActive)}
          onKeyDown={() => setMobileMenuActive(!mobileMenuActive)}
        >
          <MenuIcon />
        </div>
      </div>
      <ul
        className={`py-3 px-5 md:flex md:flex-row md:justify-between ${
          mobileMenuActive ? "block" : "hidden"
        }`}
      >
        <NavBarGroup>
          <NavBarItem to="/" end>
            Home
          </NavBarItem>
          <NavBarItem to="schedule">Schedule</NavBarItem>
        </NavBarGroup>
        <NavBarGroup>
          <div>
            <p className="text-md">Hello, {data.user.name}</p>
            <p className="text-xs">@{data.user.screenName}</p>
          </div>
          <form>
            <img
              src={data.user.profileImage}
              alt="Twitter profile image"
              className="profile-image"
            />
          </form>
        </NavBarGroup>
      </ul>
    </nav>
  );
}

function NavBarItem(props: NavLinkProps) {
  return (
    <li className="py-4 border-b-2 md:mx-4 md:py-2 md:border-b-0 hover:text-primary-dark transition duration-200 ease-in-out">
      <NavLink
        {...props}
        className={(isActive) =>
          `w-full text-md ${isActive && "border-b-2 border-white"}`
        }
      />
    </li>
  );
}

interface NavBarGroupProps {
  children: React.ReactNode;
}

function NavBarGroup({ children }: NavBarGroupProps) {
  return <div className="md:flex md:flex-row md:items-center">{children}</div>;
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="my-0 mx-auto"
      viewBox="0 0 24 24"
      width="45"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}
