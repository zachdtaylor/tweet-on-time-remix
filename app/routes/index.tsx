import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { WriteIcon } from "../components";
import { getAllTweets } from "../utils/db";
import { protectedRoute } from "~/utils/misc";

export let meta: MetaFunction = () => {
  return {
    title: "Tweet on Time",
    description: "Schedule your tweets.",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  return protectedRoute(request, async ({ user }) => ({
    tweetsSentThisWeek: 0,
    scheduledTweetCount: (await getAllTweets(user.id)).length,
  }));
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div>
      <DashboardValueCard
        linkTo="schedule"
        icon={<WriteIcon />}
        value={data.scheduledTweetCount}
        label="Scheduled Tweets"
      />
    </div>
  );
}

type DashboardValueCardProps = {
  linkTo?: string;
  value: string;
  label: string;
  icon: React.ReactNode;
};

function DashboardValueCard({
  linkTo,
  value,
  label,
  icon,
}: DashboardValueCardProps) {
  const cardClassName =
    "bg-gray-800 rounded-md p-5 m-4 inline-block hover:transform hover:scale-105 transition duration-500";
  const children = (
    <div className="flex flex-row">
      <div className="bg-twitterblue rounded-full p-3 mr-5 my-auto">{icon}</div>
      <div>
        <p className="text-twitterblue text-3xl font-bold">{value}</p>
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
  return linkTo ? (
    <Link to={linkTo} className={cardClassName}>
      {children}
    </Link>
  ) : (
    <div className={cardClassName}>{children}</div>
  );
}
