type ShimmerCommentProps = {
  length?: "short" | "medium";
};

function ShimmerComment({ length }: ShimmerCommentProps) {
  return (
    <div
      className={`h-2 bg-gray-400 mt-5 rounded-sm ${
        length === "short" ? "w-1/4" : length === "medium" ? "w-1/2" : ""
      }`}
    ></div>
  );
}

export function LoadingTweetShimmer() {
  return (
    <div className="px-2 my-10">
      <ShimmerComment length="medium" />
      <ShimmerComment />
      <ShimmerComment length="short" />
    </div>
  );
}
