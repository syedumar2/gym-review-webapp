import GymListingsPage from "@/components/GymListings/GymListingsPage";

const page = async ({
  searchParams,
}: {
  searchParams?: { search?: string; by?: string };
}) => {
  const searchText = searchParams?.search || "";
  const searchBy = searchParams?.by || "gymName";

  return (
    <>
      <GymListingsPage searchText={searchText} searchBy={searchBy}/>
    </>
  );
};

export default page;
