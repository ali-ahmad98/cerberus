import { useEffect, useState } from "react";
import { scheduleHeadingList, getAllNflSchedulelist } from "../../service/Helper";
import NflScheduleListItem from "./NflScheduleListItem";
import { format } from "date-fns";

const NflSheduleTable = () => {
  const [allNflList, setAllNflList] = useState([]);

  useEffect(() => {
    getAllNflSchedulelist((r) => {
      setAllNflList(r);
    });
  });

  return (
    <>
      {allNflList.length != 0 &&
        allNflList.map((item, index) => (
          <section className="mb-5">
            <div className="d-flex flex-column justify-content-end order-2 order-xxl-1 mt-5">
              <div>
                <button className=" nav_tabs_btn  text-white btn ms-4 ">
                  <span>
                    {new Date(item.sheduleDate).toLocaleDateString("en-us", { weekday: "long" })}
                    {format(new Date(item.sheduleDate), ",dd-MM-yyyy")}
                  </span>
                </button>
              </div>
            </div>

            <div className="table-responsive ps-4">
              <table className="table bg-white text-nowrap">
                <thead>
                  <tr className="">
                    {scheduleHeadingList.map((obj, index) => (
                      <th
                        key={index}
                        className={`font-15 fw-semibold py-3 text-nowrap   ${
                          index === 0 ? "ps-5 text-start" : ""
                        }`}
                        scope="col"
                      >
                        {obj.heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <NflScheduleListItem item={item} key={index} id={index} />
                </tbody>
              </table>
            </div>
          </section>
        ))}
    </>
  );
};

export default NflSheduleTable;
