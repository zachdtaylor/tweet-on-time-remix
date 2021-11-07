import type { LoaderFunction } from "remix";

export let loader: LoaderFunction = ({ request }) => {
  return null;
};

export default function Index() {
  return <div></div>;
}
