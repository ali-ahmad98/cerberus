import { useEffect, useState } from "react";
import { articleCommentSubmitApi, getArticleCommentApi } from "../../service/articleService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import noUserImg from "../../Assets/noImgUser.png";
import HeadingDotted from "../common/HeadingDotted";

const Comments = ({ articleId }) => {
  const [commentMsg, set_commentMsg] = useState("");
  const [inputErrors, set_inputErrors] = useState({});
  const [commentList, set_commentList] = useState({});

  const ff_isLogin = localStorage.getItem("ff_isLogin");

  useEffect(() => {
    getCommentList();
  }, [articleId]);

  const commentChangeHandler = (e) => set_commentMsg(e.target.value);

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    set_inputErrors({});

    const formData = {
      article_id: articleId,
      comment_msg: commentMsg,
    };
    if (commentMsg === "") {
      set_inputErrors({ commentMsg: "Please enter some comment." });
      return false;
    }

    articleCommentSubmitApi(formData).then(function (result) {
      try {
        const response = result.data;

        if (response.success) {
          set_commentMsg("");
          getCommentList();
          toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
        } else {
          if (response.message == "Validation Error.") {
            set_inputErrors(response.response_data);
          }
          toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  async function getCommentList() {
    getArticleCommentApi(articleId).then(function (result) {
      const response = result.data;
      set_commentList(response.response_data);
    });
  }

  return (
    <>
      <div className="container pb-5">
        <div className="row">
          <div className="col-12">
            <div className="pb-5">
              <h1 className="heading white font-web skew-heading text-uppercase">Comments</h1>
              <HeadingDotted />
            </div>
            <p className="para font-27 mb-0 font-web">Submit a Comment</p>
            {/* <p className="para font-27 mb-4 font-web">
              Your email address will not be published. Required fields are
              marked *
            </p> */}
            <form onSubmit={commentSubmitHandler}>
              <textarea
                className="para text-dark-gray font-27 font-web ps-4 w-100 rounded-0 comment-input custom_input py-3"
                rows="5"
                placeholder="Comment..."
                onChange={commentChangeHandler}
                value={commentMsg}
              />
              <p className="text-danger errorTxt">{inputErrors.commentMsg}</p>

              {ff_isLogin ? (
                <button className="font-16 text-white background-blue fw-medium comment-btn border-0">
                  Add a comment{" "}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="font-16 text-white background-blue fw-medium comment-btn border-0"
                >
                  Login and comment
                </Link>
              )}
            </form>

            {commentList && commentList.length > 0 && (
              <>
                {commentList.map((dataRow, index) => (
                  <div
                    key={index}
                    className="row justify-content-center align-items-center mt-4 pt-3"
                  >
                    <div className="col-6 col-md-3 col-lg-2 col-xl-1">
                      <img
                        className="me-4 w-100 px-3 px-xl-0"
                        src={
                          dataRow.userDetails.profile_img !== ""
                            ? dataRow.userDetails.profile_img
                            : noUserImg
                        }
                        alt={dataRow.userDetails.full_name}
                      />
                    </div>

                    <div className="col-12 col-md-9 col-lg-10 col-xl-11 ps-xl-3 pe-xxl-5">
                      <p className="para font-web font-23 mb-0">{dataRow.userDetails.full_name}</p>
                      <p className="para font-web font-23 col-xxl-11 pe-0 pe-xl-5 ps-0">
                        {dataRow.comment_msg}
                      </p>

                      {/* {
                          <p className="para font-web font-23 col-xxl-11 pe-0 pe-xl-5 ps-0" dangerouslySetInnerHTML={{
                            __html: dataRow.comment_msg,
                          }}
                          />
                        } */}
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="py-md-5"></div>
            <div className="py-md-5"></div>
            <div className="py-lg-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
