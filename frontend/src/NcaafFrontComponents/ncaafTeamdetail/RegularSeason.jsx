import ApsuImg from "../../Assets/img/apsu.png";
import ArmyImg from "../../Assets/img/army.png";
import UsfImg from "../../Assets/img/usf.png";
import TslaImg from "../../Assets/img/tsla.png";
import MemImg from "../../Assets/img/mem.png";
import SmuImg from "../../Assets/img/smu.png";
import HouImg from "../../Assets/img/hou.png";

const RegularSeason = () => {
  return (
    <>
      <div className="py-4 py-xxl-5 mt-xxl-5 regular-season-table">
        <h3 className="font-34 font-web fw-bold prospect-heading mb-5">
          <span>R</span>
          <span>E</span>
          <span>G</span>ULAR SEASON
        </h3>
        <div className="team-table text-white   min-width-392">
          <div className="d-flex align-items-center px-4 py-3 mt-2">
            <img src={ApsuImg} alt="ApsuImg" />
            <h3 className="ms-3 font-13 fw-normal w-50 mb-0 py-2">vs APSU</h3>
            <h3 className="font-13 fw-normal w-25 text-end mb-0 green">W</h3>
            <h3 className="font-13 fw-normal w-25 text-end mb-0">55-20</h3>
          </div>
          <div className="bg-light-blue3 d-flex align-items-center justify-content-between px-4 py-2">
            <img src={ArmyImg} alt="ArmyImg" />
            <h3 className="ms-3 font-13 mb-0 fw-normal w-50 py-4 text-nowrap">vs 22 ARMY</h3>
            <h3 className="font-13 mb-0 fw-normal text-end w-25 green">W</h3>
            <h3 className="font-13 mb-0 fw-normal  text-end w-25 pe-2">24-10</h3>
          </div>
          <div className="d-flex align-items-center justify-content-between px-4 py-2">
            <img src={UsfImg} alt="UsfImg" />
            <h3 className="ms-3 font-13 mb-0 fw-normal w-50 py-4 text-nowrap">vs USF</h3>
            <h3 className="font-13 mb-0 fw-normal text-end w-25 green">W</h3>
            <h3 className="font-13 mb-0 fw-normal  text-end w-25 pe-2">28-7</h3>
          </div>
          <div className="bg-light-blue3 d-flex align-items-center justify-content-between px-4 py-2">
            <img src={TslaImg} alt="TslaImg" />
            <h3 className="ms-3 font-13 mb-0 fw-normal w-50 py-4">@ TLSA</h3>
            <h3 className="font-13 mb-0 fw-normal text-center w-25"></h3>
            <h3 className="font-13 mb-0 fw-normal  text-end w-25 pe-2">PPD</h3>
          </div>
          <div className=" d-flex align-items-center justify-content-between px-4 py-2">
            <img src={SmuImg} alt="SmuImg" />
            <h3 className="ms-3 font-13 mb-0 fw-normal w-50 py-4 text-nowrap">@ 16 SMU</h3>
            <h3 className="font-13 mb-0 fw-normal text-end w-25 green">W</h3>
            <h3 className="font-13 mb-0 fw-normal  text-end w-25 pe-2">42-13</h3>
          </div>
          <div className="bg-light-blue3 d-flex align-items-center justify-content-between px-4 py-2">
            <img src={MemImg} alt="MemImg" />

            <h3 className=" ms-3 font-13 mb-0 fw-normal w-50 py-4 text-nowrap">vs MEM</h3>
            <h3 className="font-13 mb-0 fw-normal text-end w-25 green">W</h3>
            <h3 className="font-13 mb-0 fw-normal  text-end w-25 pe-2">49-10</h3>
          </div>
          <div className="d-flex align-items-center justify-content-between px-4 py-2">
            <img src={HouImg} alt="HouImg" />
            <h3 className="ms-3 font-13 mb-0 fw-normal w-50 py-4 text-nowrap">vs HOU</h3>
            <h3 className="font-13 mb-0 fw-normal text-end w-25 green">W</h3>
            <h3 className="font-13 mb-0 fw-normal  text-end w-25 pe-2">38-10</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegularSeason;
