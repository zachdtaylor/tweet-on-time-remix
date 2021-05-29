import { ActionFunction, LinksFunction, redirect } from "remix";
import stylesUrl from "../../../styles/routes/schedule/new.css";
import { writeTweet } from "../../../utils/db";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  writeTweet({
    body: body.get("body") ?? "",
    tweetDate: "2021-01-01",
    tweetTime: "01:00",
  });
  return redirect("/schedule/new");
};

export default function New() {
  return (
    <div className="w-full">
      <form method="post">
        <TweetControls bodyLength={1} showAddButton={true}>
          <textarea
            name="body"
            className="w-full h-44 p-4 resize-none"
            placeholder="What's happening?"
          />
        </TweetControls>
        <input
          className="px-3 py-2 bg-twitterblue rounded-md cursor-pointer hover:bg-secondary transition"
          type="submit"
          value="Schedule"
        />
      </form>
    </div>
  );
}

type TweetControlsProps = {
  bodyLength: number;
  children: React.ReactNode;
  showAddButton: boolean;
};

const TweetControls = ({
  bodyLength,
  children,
  showAddButton,
}: TweetControlsProps) => {
  const limit = 280;
  // const [_, dispatchThreadLength] = useThreadLength();
  return (
    <div className="my-6">
      {children}
      <div className="flex justify-between">
        <pre className="pl-3 text-xs">
          <span className={bodyLength > limit ? "text-red-600" : ""}>
            {`${bodyLength ?? 0} `}
          </span>
          / {limit} character limit
        </pre>
        {bodyLength > 0 && showAddButton && (
          <div className="mr-2">
            <AddButton onClick={() => "increment"} />
          </div>
        )}
      </div>
    </div>
  );
};

type AddButtonProps = {
  onClick: React.MouseEventHandler;
};

function AddButton({ onClick }: AddButtonProps) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
