import React from "react";
import Pagination from "../ui/pagination";

const Pagination1 = ({
  data,
  pagiation,
  ItemperPage,
  page,
  setPage,
  paginate,
}: any) => {
  return (
    <div>
      <div className="list-pagination w-full flex items-center md:mt-10 mt-10 justify-center">
        {data && (
          <Pagination
            total={Number(pagiation?.itemCount)}
            pageSize={ItemperPage}
            defaultCurrent={page}
            showLessItems={true}
            color="primary"
            prevIconClassName="py-0 text-secondary !leading-[26px]"
            nextIconClassName="py-0 text-secondary !leading-[26px]"
            onChange={(e: any) => {
              setPage(e);
              paginate(e);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Pagination1;
