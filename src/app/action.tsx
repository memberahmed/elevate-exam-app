'use server';

import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";
import { cookies } from 'next/headers';

export const fetchDiploma = async (endPoint: string, page: number) => {
  try {
    // Get the server session
    const serverSession = await getServerSession(options);
    const cookieStore = await cookies();
    const theme = cookieStore.get('next-auth.session-token');
    console.log('cookies', theme);

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
    return { data }; // Wrap the data in an object to make it easier to differentiate from errors
  } catch (error: any) {
    // Handle fetch errors and network issues
    console.error("Fetch failed:", error);

    return {
      error: error.message || "Failed to fetch data. Please check your internet connection.",
    };
  }
};
