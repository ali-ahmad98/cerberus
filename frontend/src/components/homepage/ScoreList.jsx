import { scoreListData } from "../landingPage/Helper";

const ScoreList = () => {
  return (
    <section className="scorelist-bg ">
      <div className="container-fluid">
        <ul className="mb-0 py-4">
          {scoreListData.map((val) => (
            <li className="d-inline-block cursor-pointer scorelist-items mx-sm-4  mx-2 font-smx white fw-light">
              {val.listItem}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ScoreList;
