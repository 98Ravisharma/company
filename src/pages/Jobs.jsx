import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JOBS from "../assets/JOBS.js";
import parse from "html-react-parser";

function Jobs() {
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [jobDetails, setJobDetails] = useState(null);

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");

    if (!userDetails) {
      navigate("/signup");
    } else {
      let parsedUserDetails = JSON.parse(userDetails);
      if (
        parsedUserDetails.email !== "" &&
        parsedUserDetails.password !== "" &&
        parsedUserDetails.name !== ""
      ) {
        setUserInfo(parsedUserDetails);
      }
    }
  }, []);

  useEffect(() => {
    setJobDetails(JOBS.filter((item) => item.id.__cdata === job)[0]);
  }, [job]);

  useEffect(() => {
  }, [jobDetails]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "30px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h6 className="m-2 mx-3">Welcome {userInfo?.name} ! </h6>{" "}
        <button onClick={() => handleLogout()} className="btn btn-danger">
          Logout
        </button>
      </div>

      <div
        className={
          "mt-5 container d-flex justify-content-center align-items-center"
        }
      >
        <div className="border border-rounded p-4">
          <form>
            <div className="mb-4">
              <h3>Select Programming Language</h3>
            </div>
            <div>
              {job == null && (
                <select
                  onChange={(e) => setJob(e.target.value)}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  {JOBS.map((job, key) => (
                    <option key={key} value={job?.id?.__cdata}>
                      {job?.title?.__cdata}
                    </option>
                  ))}
                </select>
              )}
              {job != null && (
                <div className="d-flex">
                  <h5 className="mt-2 text-primary">
                    Job Selected: {jobDetails?.title?.__cdata}
                  </h5>{" "}
                  <button
                    onClick={() => setJob(null)}
                    className="mx-3 btn btn-danger"
                  >
                    Clear
                  </button>
                </div>
              )}

              {job != null && (
                <div className="d-flex mt-4 ">
                  <div className="border border-rounded p-3 w-100">
                    <h3 className="d-flex justify-content-between">
                      <div>
                        {jobDetails?.title?.__cdata}{" "}
                        <h5>{jobDetails?.company?.__cdata}</h5>
                      </div>
                      <img
                        style={{
                          width: "70px",
                          height: "70px",
                        }}
                        src={jobDetails?.logo?.__cdata}
                      />
                    </h3>

                    <h6>
                      {jobDetails?.location?.__cdata},{" "}
                      {jobDetails?.country?.__cdata} -{" "}
                      {jobDetails?.postcode?.__cdata}
                    </h6>
                    <span>
                      <b>Job Type:</b> {jobDetails?.jobtype?.__cdata}
                    </span>
                    <br />
                    <br />
                    {parse(jobDetails?.description?.__cdata ?? "")}
                  </div>
                </div>
              )}

              {job != null && (
                <div
                  style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "30px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <a className="btn btn-primary" href={jobDetails?.url?.__cdata} target="_blank">
                      Apply Now
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Jobs;
