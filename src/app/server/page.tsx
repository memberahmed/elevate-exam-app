import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function server() {
  const session = await getServerSession(options);

  return (
    <div>
      {session?.permissionList?.indexOf("add_product") !== -1 && (
        <button className="bg-red-500 py-6 px-4 m-3"> add product </button>
      )}
      {session?.permissionList?.indexOf("delete_product") !== -1 && (
        <button className="bg-red-500 py-6 px-4 m-3"> Delete product </button>
      )}
      {session?.permissionList?.indexOf("edit_product") !== -1 && (
        <button className="bg-red-500 py-6 px-4 m-3"> edit product </button>
      )}
    </div>
  );
}
