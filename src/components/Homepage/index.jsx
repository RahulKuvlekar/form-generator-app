import { useFormContext } from "@/hooks/useFormContext";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

const HomePage = () => {
  const { formState } = useFormContext();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const sortedFormsList = structuredClone(formState?.forms).sort((a, b) => {
    const dateOne = moment(a.date);
    const dateTwo = moment(b.date);
    return dateTwo.diff(dateOne);
  });

  useEffect(() => {
    (() => {
      setTimeout(() => {
        setLoader(false); //Fake loader
      }, 1500);
    })();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold p-4 px-8 border-b border-neutral-300 mb-4">
        Form Lists
      </h1>
      <section className="flex flex-row flex-wrap gap-4 px-8">
        {(() => {
          if (loader)
            return (
              <Fragment>
                {[...Array(12)].map((item, idx) => (
                  <Skeleton
                    key={`skeleton-${idx}`}
                    className="w-full max-w-[300px] h-[125px] rounded-md"
                  />
                ))}
              </Fragment>
            );
          return (
            <Fragment>
              {sortedFormsList &&
                sortedFormsList.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => navigate(`/viewform/${item.id}`)}
                    className="p-4 border border-neutral-300 w-full max-w-[300px] rounded-md hover:bg-neutral-200 shadow-lg cursor-pointer"
                  >
                    <h1 className="text-2xl text-center font-medium mb-8">
                      {item.name}
                    </h1>
                    <p className="text-right text-neutral-400">
                      {moment(item.date).fromNow()}
                    </p>
                  </article>
                ))}
            </Fragment>
          );
        })()}
      </section>
    </>
  );
};

export default HomePage;
