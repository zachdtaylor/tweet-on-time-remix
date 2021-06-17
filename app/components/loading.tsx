type ShimmerCommentProps = {
  length?: "short" | "medium";
};

function ShimmerComment({ length }: ShimmerCommentProps) {
  return (
    <div
      className={`h-1 bg-gray-100 mt-5 animate-shimmer rounded-md ${
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
