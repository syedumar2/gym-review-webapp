export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-secondary"></div>
      <h2 className=" font-sans text-lg py-8 font-semibold tracking-tight text-secondary sm:text-md sm:leading-none">
        Loading...
      </h2>
    </div>
  );
};
