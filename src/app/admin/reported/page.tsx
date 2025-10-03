import {
  AdminDashboardNav,
  Footer,
  GymSubmissionsList,
  Header,
  ReportedReviewsList,
} from "@/components";

const page = () => {
  return (
    <>
      <Header />
      <AdminDashboardNav />
      <ReportedReviewsList />
      <Footer />
    </>
  );
};

export default page;
