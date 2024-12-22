

export const clientAction = async (endPoint:string , page: number, token: string) => {
  try {
    const res = await fetch(`https://exam.elevateegy.com/api/v1/${endPoint}?page=${page}&limit=3`, {
      headers: {
        token,
      },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error if you want it to propagate
  }
};
