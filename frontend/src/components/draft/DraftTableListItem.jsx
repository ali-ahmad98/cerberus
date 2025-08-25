/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { DownArrowIcon } from "../icons/Icons";

const DraftTableListItem = ({ id, item, activeHandler, view }) => {
  const {
    rank,
    playerName,
    school,
    pos,
    height,
    weight,
    shirtcolor,
    posRank,
    overRank,
    grade,
    teamImage2,
    playerImage,
  } = item;

  return (
    <>
      <div
        onClick={() => activeHandler(id)}
        className={` ${id % 2 === 0 ? "bg-very-light-gray" : "bg-white"}  ${
          id === view && "active-dropwdown"
        } py-4 `}
      >
        <div className="draft-table-list-items cursor-pointer d-flex  justify-content-between w-100 px-4 px-lg-5">
          <span className=" font-18 text-black fw-normal min-width-20">{rank}</span>
          <span className="min-width-200 font-18 text-black fw-normal ">
            <img className="pe-3" src={teamImage2} alt="playerTeamIcon" />
            {playerName}
          </span>
          <span className=" font-18 text-black fw-normal min-width-200">{school}</span>
          <span className=" text-nowrap font-18 text-black fw-normal">
            <span className="min-width-50 d-inline-block">{pos}</span>
            <span className="min-width-50 d-inline-block text-end">
              <DownArrowIcon />
            </span>
          </span>
        </div>
        <AnimatePresence>
          {id === view && (
            <motion.div
              transition={{ type: "none", stiffness: 80 }}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { type: "none", stiffness: 80 },
              }}
            >
              <div className="draft-table-list-items  d-flex  align-items-center justify-content-between w-100 py-5 px-3">
                <div className="d-flex align-items-center w-100 text-nowrap">
                  <div className="user-image-with-border">
                    <img src={playerImage} alt="userimg" />
                  </div>

                  <div className="d-flex flex-column ms-3 text-nowrap">
                    <h4 className="font-20 text-black d-flex align-items-center">
                      <span className="small-border-circle me-3">OT</span>
                      Penei Sewell
                    </h4>
                    <p className="text-dark-gray font-13 fw-light">
                      {height}m | {weight} kg | {shirtcolor}
                    </p>
                  </div>
                </div>

                <button className="sky-blue-border-btn mx-3">FOLLOW</button>
                <div className="d-flex w-100 justify-content-around mt-4 mt-sm-0 text-nowrap px-2">
                  <span className="border-right-1-bdbec0"></span>
                  <div className="d-flex flex-column align-items-center ps-3">
                    <h2 className="font-20 text-black fw-normal">{posRank}</h2>
                    <h6 className="font-13 text-dark-gray fw-light">POS RK</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h2 className="font-20 text-black fw-normal">{overRank}</h2>
                    <h6 className="font-13 text-dark-gray fw-light">OVR RK</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h2 className="font-20 text-black fw-normal">{grade}</h2>
                    <h6 className="font-13 text-dark-gray fw-light">GRADE</h6>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default DraftTableListItem;
