import { useState, useEffect } from "react";
import Toast from '../helpers/Toast';
import { getData, deleteTask } from "../data";
import Create from "./Create";
import Edit from "./Edit";

/**
 * @author traj3ctory
 * @function Display
 **/

export const Display = () => {
  const [todoData, setTodoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editId ,setEditId] = useState("");

  // Function to fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resp = await getData();
      Toast("Success!", resp.message, "success");	
      setTodoData(resp.data);
    } catch (error) {
      Toast("Attention!", error, "warning");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Function to handle delete event
  const handleDelete = async (id) => {
    await deleteTask(id);
    await fetchData();
  };
  // Function to handle edit event
  const handleEdit = (id) => {
    setCreate(false);
    setEdit(true);
    setEditId(id);
  };
  const handleCreate = () => {
    setEdit(false);
    setCreate(true);
  }

  return (
    <div className="container-md container-fluid my-3 display_section">
      <div className="w-100 d-flex justify-content-end">
        <button className="btn btn-primary shadow-sm btn_add" onClick={handleCreate}>&#10788;&nbsp;Create a task</button>
      </div>
      <div className="row">
        {todoData?.length > 0 && isLoading === false ? (
          todoData?.map((task) => {
            return (
              <div className="col-lg-3 col-md-4" key={task.id}>
                <div className={`card card-body card_list ${task.completed === true ? 'completed' : 'pending'}`} >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="button">
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>&#128465;</button>
                    <button className="btn btn-sm btn-primary text-white mx-2 p-1" onClick={() => handleEdit(task.id)}>&#128393;</button>
                  </div>
                  <div className="status">
                    {task.completed && <button className={`completed btn btn-sm text-success ${task.completed && 'completed'}`}>
                      &#10003;
                    </button>
                    }
                    {
                      !task.completed &&
                      <button className={`completed btn btn-sm text-warning ${!task.completed && 'pending'}`}>
                        &#10804;
                      </button>
                    }
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Task</h1>
        )}
        {isLoading && <h1>Loading...</h1>}
      </div>
      {create && <Create show={setCreate} reload={setRefresh} />}
      {edit && <Edit show={setEdit} reload={setRefresh} id={editId} />}
    </div>
  );
};

export default Display;
