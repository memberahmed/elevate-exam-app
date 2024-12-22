'use client';

import { Subjects } from "@/app/InterFaces/InterFaces";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react"
import DiplomaCard from "../diploma/diplomaCard";
import { clientAction } from "@/app/clientAction";
import { useSession } from "next-auth/react";

export default function LoadMore() {
  const userSession = useSession();
  const { ref, inView } = useInView();
  const [data, setData] = useState<Subjects[]>([]);
  const [page, setPage] = useState(2); 
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setLoading(true); 
      clientAction('subjects', page , userSession?.data?.token )
        .then((res) => {
          if (res?.subjects?.length) {
            setData((prevData) => [...prevData, ...res.subjects]);
            setPage((prevPage) => prevPage + 1);
          }
          if (page >= res?.metadata?.numberOfPages) {
            setHasMore(false);
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [inView, hasMore, loading, page]);

  return (
    <>
      <section>
        <motion.div 
        
        className="qiz grid md:grid-cols-3  gap-3 grid-cols-1 pb-6">
          {data?.map((subject: Subjects , index:number) => (
            <DiplomaCard item={subject} index = {index} key={subject._id} />
          ))}
        </motion.div>
      </section>
      {hasMore && (
        <section>
          <div className="text-center" ref={ref}>
            {loading ? <p>Loading...</p> : null}
            {error && <p className="text-red-500">Error: {error}</p>}
          </div>
        </section>
      )}
    </>
  );
}
