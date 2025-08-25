import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import innerdot from "../../Assets/images/innerdot.png";
import mailIcon from "../../Assets/images/mail.png";
import locateIcon from "../../Assets/images/locate.png";
import callIcon from "../../Assets/images/call.png";
import { manageTitle } from "../../service/HeaderManage";
import { contactUsSubmit, getFaqList } from "../../service/cmsService";
import GlobalConfig from "../../GlobalConfig";

const Help = () => {
  manageTitle("Help");
  const [faqListData, set_faqListData] = useState({});
  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [address, set_address] = useState("");
  const [message, set_message] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  useEffect(() => {
    getFaqListData();
  }, []);

  async function getFaqListData() {
    getFaqList().then(function (result) {
      const response = result.data;
      set_faqListData(response.response_data);
    });
  }

  let faqDataContent = <div>Loading...</div>;
  if (faqListData && faqListData.length > 0) {
    faqDataContent = faqListData.map((faqRow, index) => (
      <div className="accordion-item" key={index}>
        <h2 className="accordion-header" id={`heading${index}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${index}`}
            aria-expanded="true"
            aria-controls={`collapse${index}`}
          >
            {faqRow.faq_question}
          </button>
        </h2>
        <div
          id={`collapse${index}`}
          className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
          aria-labelledby={`heading${index}`}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <h6>{faqRow.faq_ans_title}</h6>
            <p>{faqRow.faq_ans_description}</p>
          </div>
        </div>
      </div>
    ));
  }

  const nameChangeHandler = (e) => set_name(e.target.value);
  const emailChangeHandler = (e) => set_email(e.target.value);
  const phoneChangeHandler = (e) => set_phone(e.target.value);
  const addressChangeHandler = (e) => set_address(e.target.value);
  const messageChangeHandler = (e) => set_message(e.target.value);

  const cmsFormSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      message: message,
    };
    contactUsSubmit(formData).then(function (result) {
      try {
        const response = result.data;

        if (response.success) {
          setInputErrors({});
          set_name("");
          set_email("");
          set_phone("");
          set_address("");
          set_message("");
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          if (response.message == "Validation Error.") {
            setInputErrors(response.response_data);
          }
          toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <section className="innerMainbg helpBg">
      <div className="innerBannerbg">
        <div className="innerShadow">
          <div className="innerDots">
            <div className="innerHeading">
              <h2>Help</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="innerBodycontent">
        <div className="container customContainer">
          <div className="row mb-4">
            <div className="col-md-12">
              <h3>Contact Us</h3>
              <img src={innerdot} alt="" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="contactThrough">
                <img src={mailIcon} alt="" />
                <p>{GlobalConfig.CONTACT_US_MAIL_1}</p>
                <p>{GlobalConfig.CONTACT_US_MAIL_2}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contactThrough">
                <img src={locateIcon} alt="" />
                <p>{GlobalConfig.CONTACT_US_ADDRESS}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contactThrough">
                <img src={callIcon} alt="" />
                <p>{GlobalConfig.CONTACT_US_PH_NO_1}</p>
                <p>{GlobalConfig.CONTACT_US_PH_NO_2}</p>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-12">
              <h3>Get In Touch</h3>
              <img src={innerdot} alt="" />
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-12">
              <form className="helpForm" onSubmit={cmsFormSubmitHandler}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      value={name}
                      onChange={nameChangeHandler}
                      className="form-control"
                      placeholder="Name"
                    />
                    <p className="text-danger errorTxt">{inputErrors.name}</p>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={emailChangeHandler}
                      className="form-control"
                      placeholder="Email"
                    />
                    <p className="text-danger errorTxt">{inputErrors.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <input
                      type="tel"
                      value={phone}
                      onChange={phoneChangeHandler}
                      className="form-control"
                      placeholder="Phone"
                    />
                    <p className="text-danger errorTxt">{inputErrors.phone}</p>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      value={address}
                      onChange={addressChangeHandler}
                      className="form-control"
                      placeholder="Address"
                    />
                    <p className="text-danger errorTxt">{inputErrors.address}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mb-4">
                    <textarea
                      value={message}
                      onChange={messageChangeHandler}
                      className="form-control"
                      placeholder="Message"
                    ></textarea>
                    <p className="text-danger errorTxt">{inputErrors.message}</p>
                  </div>
                </div>
                <button type="" className="submitbtn">
                  Submit Now
                </button>
              </form>
            </div>
          </div>

          {faqListData && faqListData.length > 0 ? (
            <>
              <div className="row">
                <div className="col-md-12">
                  <h3>Frequently Asked Questions </h3>
                  <img src={innerdot} alt="" />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                  <div className="homeaccordion" id="accordionExample">
                    {faqDataContent}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default Help;
