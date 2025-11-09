import { ParsedGym } from "./GymDetails";

const GymDescription = ({ gym }: { gym: ParsedGym }) => {
  return (
    <>
      {/* DESCRIPTION */}
      <section className="bg-accent/50 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2 mb-4">
          Description
        </h2>
        <p className="text-md text-black">{gym.description}</p>
      </section>
    </>
  );
};

export default GymDescription;
