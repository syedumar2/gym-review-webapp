import {
  CARDIO_EQUIPMENT_LABELS,
  STRENGTH_EQUIPMENT_LABELS,
  FUNCTIONAL_EQUIPMENT_LABELS,
  MISC_EQUIPMENT_LABELS,
} from "@/types/gym";
import { PersonStanding, Dumbbell, Settings, Settings2 } from "lucide-react";
import { ParsedGym } from "./GymDetails";

const GymEquipment = ({ gym }: { gym: ParsedGym }) => {
  return (
    <>
      {" "}
      {/* EQUIPMENT */}
      {(gym.cardioEquipment?.length ||
        gym.strengthEquipment?.length ||
        gym.functionalEquipment?.length ||
        gym.miscEquipment?.length) && (
        <section className="bg-primary rounded-xl p-6 shadow-md space-y-6">
          <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2">
            Equipment
          </h2>

          {[
            {
              title: "Cardio Equipment",
              list: gym.cardioEquipment,
              labels: CARDIO_EQUIPMENT_LABELS,
              Icon: PersonStanding,
            },
            {
              title: "Strength Equipment",
              list: gym.strengthEquipment,
              labels: STRENGTH_EQUIPMENT_LABELS,
              Icon: Dumbbell,
            },
            {
              title: "Functional Equipment",
              list: gym.functionalEquipment,
              labels: FUNCTIONAL_EQUIPMENT_LABELS,
              Icon: Settings,
            },
            {
              title: "Miscellaneous Equipment",
              list: gym.miscEquipment,
              labels: MISC_EQUIPMENT_LABELS,
              Icon: Settings2,
            },
          ].map(
            (section, i) =>
              section.list?.length > 0 && (
                <div key={i}>
                  <h3 className="text-xl  font-semibold text-secondary flex items-center gap-2 mb-3 ">
                    <section.Icon size={20} /> {section.title}
                  </h3>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {section.list.map((eq, j) => (
                      <li
                        key={j}
                        className="bg-accent rounded-lg p-3 text-center text-sm font-medium shadow-sm"
                      >
                        {section.labels[eq as keyof typeof section.labels]}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </section>
      )}
    </>
  );
};

export default GymEquipment;
