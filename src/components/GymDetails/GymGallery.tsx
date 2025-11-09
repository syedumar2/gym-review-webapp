import { ParsedGym } from "./GymDetails";

const GymGallery = ({ gym }: { gym: ParsedGym }) => {
  return (
    <>
      {/* GALLERY */}
      {gym.images?.length > 1 && (
        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2 mb-4">
            Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gym.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`${gym.gymName} ${i + 1}`}
                className="w-full h-52 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default GymGallery;
