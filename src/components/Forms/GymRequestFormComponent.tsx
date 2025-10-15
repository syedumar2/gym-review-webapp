  "use client";

  import {
    GymFormInput,
    GymFormSchema,
    PlanType,
  } from "@/schemas/GymRequestSchema";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { Button } from "../ui/button";
  import GymImageUploadSection from "./GymImageUploadSection";
  import GymAddressSection from "./GymRequest/GymAddressSection";
  import GymAmenitiesSection from "./GymRequest/GymAmenitiesSection";
  import GymBasicInfoSection from "./GymRequest/GymBasicInfoSection";
  import GymEquipmentSection from "./GymRequest/GymEquipmentSection";
  import GymMembershipPlanSection from "./GymRequest/GymMembershipPlanSection";
  import GymTimingsSections from "./GymRequest/GymTimingsSections";
  import { ImageData } from "@/types/gym";
  import { useState } from "react";
  import { useSession } from "next-auth/react";
  import { submitGymRequest } from "@/actions/gymRequestSubmitAction";
  import { toast } from "sonner";
  import { useRouter } from "next/navigation";

  export default function GymRequestFormComponent() {
    const [images, setImages] = useState<ImageData[]>([]);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<GymFormInput>({
      resolver: zodResolver(GymFormSchema),
      defaultValues: {
        name: "",
        address: "",
        genderSegregation: "UNISEX",
        city: "",
        description: "",
        eveningEnd: "",
        eveningStart: "",
        morningEnd: "",
        morningStart: "",
        phone: "",
        state: "",
        type: "COMMERCIAL",
        membershipPlans: [
          { planName: "", planType: PlanType.MONTHLY, price: 1, perks: [""] },
        ],
        amenities: [],
        cardioEquipment: [],
        strengthEquipment: [],
        functionalEquipment: [],
        miscEquipment: [],
      },
    });

    const onSubmit = async (data: GymFormInput) => {
      console.log("Form data:", data);
      console.log("Errors:", errors);
      setLoading(true);

      try {
        // Guard: check if session is valid
        if (!session || !session.user || !session.user.id) {
          toast.error("You must be logged in to submit a gym request.");
          return;
        }

        // Guard: check if images are provided
        if (!images || images.length === 0) {
          toast.error("Please upload at least one image of the gym.");
          return;
        }
        console.log("Form submitted:", data);

        const res = await submitGymRequest(data, images, session.user.id);

        // Guard: check response structure
        if (!res || typeof res.success !== "boolean") {
          toast.error("Unexpected server response. Please try again.");
          return;
        }

        if (!res.success) {
          toast.error(res.message || "Something went wrong!");
          return;
        }

        toast.success(res.message || "Gym request submitted successfully!");
        router.push("/dashboard"); // TODO: change redirect to submission details page
      } catch (err: any) {
        console.error("Error submitting gym request:", err);
        toast.error(err?.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (!session) {
      return <div>User not logged in</div>;
    }

    return (
      <section className="max-w-4xl my-6 min-h-screen mx-auto bg-accent p-6 sm:p-8 border border-gray/50 rounded-xl shadow mt-4">
        <h1 className="dashboard-title">Gym Request Form</h1>
        <p className="text-xl font-medium">
          Enter the details of the gym you wish to post on this website
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4   my-4">
          <GymBasicInfoSection control={control} errors={errors} />

          <GymAmenitiesSection control={control} errors={errors} />

          <GymEquipmentSection control={control} errors={errors} />

          <GymAddressSection control={control} errors={errors} />

          <GymTimingsSections control={control} />
          <GymMembershipPlanSection control={control} errors={errors} />

          <GymImageUploadSection images={images} setImages={setImages} />

          <div className="flex w-full justify-end mt-4">
            {" "}
            <Button type="submit" variant={"secondary"}>
              Submit
            </Button>
          </div>
        </form>
      </section>
    );
  }

  //TODO: Pass Requesting User, Images
