import Header from "./Header";
import { auth } from "../../../auth";

const ServerHeader = async () => {
  const session = await auth(); // server-only
  return <Header session={session} />;
};

export default ServerHeader;
