import Request from "../helpers/Request";
// import Dexie from "dexie";

// export const db = new Dexie("TaskDB");
// db.version(1).stores({
//   task: "id, title, description",
// });

/**
 * Function to create a task and add it to the database
 * @param {object} task
 * @returns {Promise}
 */
export const createData = async (task) => {
  try {
    const response = await Request("POST", "", task);
    return response.data;
    // await db.task.add(task);
    // await getData();
  } catch (error) {
    throw new Error(error);
  } finally {
    await getData();
  }
};

/**
 * Function to get all tasks
 * @returns {Promise}
 */

export const getData = async () => {
  // return await db.task.toArray();
  const response = await Request("GET", "");
  return response.data;
};

/**
 * Function to get a task by id
 */
export const getDataById = async (id) => {
  const response = await Request("GET", `/${id}`);
  return response.data;
}

/**
 * Function to delete a task
 * @param {string} id
 * @returns {Promise}
 */

export const deleteTask = async (id) => {
  try {
    const response = await Request("DELETE", `/${id}`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Function to update a task
 * @param {string} id
 * @param {object} task
 * @returns {Promise}
 *
 */

export const updateTask = async (id, task) => {
  try {
    const response = await Request("PUT", id, task);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
