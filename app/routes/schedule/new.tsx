import {
  ActionFunction,
  Link,
  LinksFunction,
  redirect,
  useActionData,
} from "remix";
import { protectedRoute } from "~/utils/misc";
import stylesUrl from "../../styles/routes/schedule/new.css";
import { writeTweet } from "../../utils/db";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let action: ActionFunction = async ({ request }) => {
  return protectedRoute(request, async ({ user }) => {
    const body = new URLSearchParams(await request.text());
    const date = body.get("tweetDate");
    const time = body.get("tweetTime");
    if (!date || !time) {
      throw new Error("Date or time was undefined");
    }
    writeTweet({
      body: body.get("body") ?? "",
      sendAt: new Date(`${date}T${time}`),
      userId: user.id,
    });
    return redirect("/schedule");
  });
};

export default function New() {
  const data = useActionData();
  console.log(data);
  return (
    <div className="absolute z-10 top-0 left-0 w-full h-full lg:px-32 lg:py-24 bg-gray-600 bg-opacity-50">
      <div className="bg-primary p-6 rounded-md">
        <div className="inline">
          <CloseButton />
        </div>
        <form method="post">
          <TweetControls bodyLength={1} showAddButton={true}>
            <textarea
              name="body"
              className="w-full h-44 p-4 resize-none"
              placeholder="What's happening?"
            />
          </TweetControls>
          <div className="my-2">
            <input
              name="tweetDate"
              type="date"
              className="bg-primary px-2 py-1"
            />
            <input
              name="tweetTime"
              type="time"
              className="bg-primary px-2 py-1"
            />
          </div>
          <input
            className="px-3 py-2 bg-twitterblue rounded-md cursor-pointer hover:bg-secondary transition"
            type="submit"
            value="Schedule"
          />
        </form>
      </div>
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

function CloseButton() {
  return (
    <Link to=".." replace>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </Link>
  );
}
