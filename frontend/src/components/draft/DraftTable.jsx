import { useState } from "react";
import { ArrowWithRectangle, LeftArrowWithRectangle } from "../icons/Icons";
import { drafttablelist } from "../nfl-schedule/Helper";
import DraftTableListItem from "./DraftTableListItem";

const DraftTable = () => {
  const [view, setView] = useState(null);

  const activeHandler = (value) => {
    if (value === view) {
      setView(null);
    } else {
      setView(value);
    }
  };

  return (
    <div className="p-lg-4">
      <div className="draft-tablehead px-3">
        <ul>
          {drafttablelist.map((item, index) => (
            <li key={index}>{item.pos}</li>
          ))}
        </ul>
        <span className="cursor-pointer">
          <LeftArrowWithRectangle />
        </span>
      </div>
      <div className="bg-white px-3 px-lg-4 table-responsive">
        <div className="draft-table-head-wrapper d-flex justify-content-between w-100 py-4">
          <span className="font-18 text-black fw-semibold text-center ps-4 ps-lg-5">RK</span>
          <span className="font-18 text-black fw-semibold min-width-200">PLAYER</span>
          <span className="font-18 text-black fw-semibold min-width-200 ">SCHOOL</span>
          <span className="font-18 text-black fw-semibold min-width-140 ps-4 ">POS</span>
        </div>
        <div className="draft-table-body-wrapper bg-white">
          {drafttablelist.map((item, index) => (
            <DraftTableListItem
              key={index}
              item={item}
              id={index}
              activeHandler={activeHandler}
              view={view}
            />
          ))}
        </div>

        <div className="table-pagination-wrapper d-flex justify-content-center align-items-center py-5">
          <span className="left-arrow-icon-skyblue-hover">
            <ArrowWithRectangle />
          </span>
          <ul className="pb-0 mb-0 d-flex justify-content-center align-items-center font-15 text-dark-gray list-unstyled">
            <li className="px-4 cursor-pointer fw-normal">1</li>
            <li className="px-4 cursor-pointer fw-normal">2</li>
            <li className="px-4 cursor-pointer fw-normal">3</li>
            <li className="px-4 cursor-pointer fw-normal">4</li>
            <li className="px-4 cursor-pointer fw-normal">...</li>
            <li className="px-4 cursor-pointer fw-normal">10</li>
          </ul>
          <span className="transform-rotate-180 left-arrow-icon-skyblue-hover">
            <ArrowWithRectangle />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DraftTable;
