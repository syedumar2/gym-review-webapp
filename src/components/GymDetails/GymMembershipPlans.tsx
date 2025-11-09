import { ParsedGym } from "./GymDetails";

const GymMembershipPlans = ({ gym }: { gym: ParsedGym }) => {
  return (
    <>
      {/* MEMBERSHIP PLANS */}
      {gym.membershipPlans?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2">
            Membership Plans
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gym.membershipPlans.map((plan, i) => (
              <div
                key={i}
                className="bg-accent/60 rounded-xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition"
              >
                <h3 className="font-bold text-lg  text-gray ">{plan.planType}</h3>
                <p className="text-secondary font-semibold mt-1">
                  ₹{plan.price} / month
                </p>
                <ul className="mt-3 list-disc list-inside text-gray text-sm space-y-1 ">
                  {plan.perks.map((perk, j) => (
                    <li key={j}>{perk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default GymMembershipPlans;
