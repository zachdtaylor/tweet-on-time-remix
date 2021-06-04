import type { MetaFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Tweet on Time",
    description: "Schedule your tweets.",
  };
};

export let loader: LoaderFunction = async () => {
  return { name: "hi" };
};

export default function Index() {
  const data = useRouteData();
  return <div>{data.name}</div>;
}
