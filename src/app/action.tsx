import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export const fetchDiploma = async (endPoint: string, page: number) => {
  try {
    // Get the server session
    const serverSession = await getServerSession(options);

    // Perform the fetch request
    const result = await fetch(
      `https://exam.elevateegy.com/api/v1/${endPoint}?page=${page}&limit=3`,
      {
        headers: {
          token: serverSession?.token || "",
        },
      }
    );

    // Check if the response is OK
    if (!result.ok) {
      throw new Error(`Error: ${result.status} ${result.statusText}`);
    }

    // Parse the JSON response
    const data = await result.json();
    return data;
  } catch (error) {
    // Handle fetch errors and network issues
    console.error("Fetch failed:", error);

    return { error: "Failed to fetch data. Please check your internet connection." };
  }
};
