import GymListingsPage from "@/components/GymListings/GymListingsPage";

const page = async ({
  searchParams,
}: {
  searchParams?: { search?: string; by?: string };
}) => {
  const { search, by } = await searchParams ?? {};
  const searchText = search || "";
  const searchBy = by || "gymName";

  return (
    <>
      <GymListingsPage searchText={searchText} searchBy={searchBy} />
    </>
  );
};

export default page;
