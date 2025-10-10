
import { auth, signOut } from "../../../../auth";

const page = async () => {
  const session = await auth();

  return <div>{JSON.stringify(session)}
  <form action={async()=>{
    "use server"
    await signOut(); 
  }}>
    <button type="submit">Log Out</button>
  </form>
  
  </div>;
};

export default page;
