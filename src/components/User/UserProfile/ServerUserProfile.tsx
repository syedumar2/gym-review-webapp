import { getUserData } from "@/actions/userActions";
import { auth } from "../../../../auth";
import UserProfile from "./UserProfile";

const ServerUserProfile = async () => {
      const session = await auth(); 
      if(!session ||!session.user) return null;
      const userData = await getUserData(session.user.id);
     

  if (!userData.data) return null;

  return (
    <UserProfile user={userData.data} />
  )
}

export default ServerUserProfile