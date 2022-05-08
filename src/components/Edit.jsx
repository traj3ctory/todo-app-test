import { useState, useEffect } from "react";
import Toast from '../helpers/Toast';
import { getDataById, updateTask } from "../data";

/**
 * @author traj3ctory
 * @function Edit
 **/

const Edit = (props) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("")
  const id = props.id;

  // Function to fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resp = await getDataById(id);
      setData(resp.data);
      Toast("Success!", resp.message, "success");
    } catch (error) {
      Toast("Attention!", error, "warning");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // function to handle form change event
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "completed") {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // Function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resp = await updateTask(id, data);
      props.show(false);
      props.reload(true);
      Toast("Info!", resp.message, "info");
    } catch (error) {
      Toast("Attention!", error, "warning");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row edit_section">
      <div className="col-lg-6 col-md-12 mx-auto">
        <div className="card card-body border-0 shadow-sm">
          <form action="" onSubmit={handleSubmit}>
            <div className="w-100">
            <h5 className="h5">Edit Task - <i>{data.title}</i></h5>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="title">Task Name</label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Task Name"
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols="20"
                rows="5"
                value={data.description}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Description"
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={data.completed}
                name="completed"
                id="completed"
                onChange={(e) => handleChange(e)}
              />
              <label className="form-check-label" htmlFor="completed">
                {data.completed === true ? "COMPLETED" : "IN-PROGRESS"}
              </label>
            </div>
            <div className="w-100 d-flex justify-content-end">
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  Loading...
                </button>
              ) : (
                <button className="btn btn-primary" type="submit">
                  &#8921;&nbsp;Submit
                </button>
              )}
              <button
                className="btn btn-danger mx-1"
                onClick={(e) => props.show(false)}
              >
                &#10754;&nbsp;Close
              </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
