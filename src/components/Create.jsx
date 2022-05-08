import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Toast from '../helpers/Toast';
import { createData } from "../data";

/**
 * @author traj3ctory
 * @function Create
 **/

const Create = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validation = () => {
    if (title === "") {
      setError("Title is required");
      return;
    }
    if (description === "") {
      setError("Description is required");
      return;
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validation();
    if (error === "") {
      try {
        setIsLoading(true);
        const resp = await createData({ id: uuidv4(), title, description });
        Toast("Success!", resp.message, "success");
        setTitle("");
        setDescription("");
        props.show(false);
        props.reload(true);
      } catch (error) {
        Toast("Attention!", error, "warning");
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="row create_section">
      <div className="col-lg-6 col-md-12 mx-auto">
        <div className="card card-body border-0 shadow-sm">
          <form action="" onSubmit={handleSubmit}>
          <div className="w-100">
            <h5 className="h5">Create Task</h5>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="title">Task Name</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                className="form-control form-control-sm"
              />
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

export default Create;
