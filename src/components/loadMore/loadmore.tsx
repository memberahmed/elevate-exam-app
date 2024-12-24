'use client';

import { Subjects } from "@/app/InterFaces/InterFaces";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import DiplomaCard from "../diploma/diplomaCard";
import { clientAction } from "@/app/clientAction";
import { useSession } from "next-auth/react";

export default function LoadMore() {
  const { data: session } = useSession();
  const { ref, inView } = useInView();
  const [data, setData] = useState<Subjects[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numberOfTries, setNumberOfTries] = useState<number>(4);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (session?.token) {
      setIsReady(true); // Mark as ready once session and other dependencies are available
    }
  }, [session]);

  useEffect(() => {
    if (!isReady || !inView || !hasMore || loading || numberOfTries <= 0) return;
  
    const fetchData = async () => {
      setLoading(true);
      setNumberOfTries((prev) => prev - 1);
  
      try {
        const res = await clientAction("subjects", page, session?.token);
        if (res?.subjects?.length) {
          setData((prevData) => [...prevData, ...res.subjects]);
          setPage((prevPage) => prevPage + 1);
        }
        if (page >= res?.metadata?.numberOfPages) {
          setHasMore(false);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [inView, hasMore, loading, page, isReady, session?.token, numberOfTries]);

  return (
    <>
      <section>
        <motion.div className="qiz grid md:grid-cols-3 gap-3 grid-cols-1 pb-6">
          {data?.map((subject: Subjects, index: number) => (
            <DiplomaCard item={subject} index={index} key={subject._id} />
          ))}
        </motion.div>
      </section>
      {hasMore && (
        <section>
          <div className="text-center" ref={ref}>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
          </div>
        </section>
      )}
    </>
  );
}
