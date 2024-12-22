import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/route";
export default async function server() {
  const session = await getServerSession(options)
  console.log('session from server session' ,session)
  return (
    <div>
      <h1>server</h1>
    </div>
  );
}
