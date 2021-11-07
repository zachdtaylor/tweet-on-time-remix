import React from "react";
import { NavLinkProps, NavLink } from "react-router-dom";
import { TwitterData } from "~/utils/twitter-client";

export function NavBar({ data }: { data: TwitterData }) {
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
            <p className="text-md">Hello, {data.name}</p>
            <p className="text-xs">@{data.screenName}</p>
          </div>
          <form>
            <img
              src={data.profileImage}
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
        className={({ isActive }) =>
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
