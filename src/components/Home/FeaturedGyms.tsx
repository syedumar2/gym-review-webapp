import { Gym } from "@/types/gym";

type FeaturedGymsProps = {
  listings?: Gym[];
};

const FeaturedGyms = ({ listings = [] }: FeaturedGymsProps) => {
  if (listings.length === 0) {
    return <p>No featured gyms available.</p>;
  }

  return (
    <section className="pt-8 px-4 bg-accent">
        <h1 className="section-heading">Featured Gyms</h1>
        <div 
        className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory "
        >
          {listings.map((gym: Gym) => (
            <div
              key={gym.id}
              className="w-[400px]  border border-accent rounded-lg shadow bg-primary overflow-hidden "
            >
              <img
                src={gym.images[0]}
                alt={gym.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{gym.name}</h2>
                <p className="text-sm text-gray-600">{gym.address.city}</p>
                <p className="text-sm">{gym.type}</p>
                <p className="text-yellow-600">⭐ {gym.avgRating}</p>
              </div>
            </div>
          ))}
        </div>
        <h2 className="section-text text-end mt-8 ">Explore more gyms</h2>
    </section>);
};

export default FeaturedGyms;
