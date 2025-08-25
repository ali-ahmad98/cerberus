import { followNcaaList, followNflList } from "./Helper";

const FollowLinks = ({ page }) => {
  const follow_links = page == "NFL" ? followNflList : followNcaaList;
  return (
    <>
      <div className="mb-4 mt-5 follow-cfs">
        <h2 className="heading font-34 white font-web skew-heading text-uppercase">
          follow {page}
        </h2>
        <span className="first-box d-inline-block"></span>
        <span className="second-box d-inline-block mx-2"></span>
        <span className="third-box d-inline-block"></span>
      </div>
      <div>
        {follow_links.map((obj, index) => (
          <a
            key={index}
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none links-hover text-white d-flex mt-1 mt-xxl-0 font-18 fw-light"
            href={`${obj.linkUrl}`}
          >
            <span className="pe-4 min-w-40">{obj.socialIconUrl}</span>
            <span>{obj.socialLink}</span>
          </a>
        ))}
      </div>
    </>
  );
};

export default FollowLinks;
