import { instance } from "../plugins/axios";
/**
 * AXIOS FUNCTION
 * @param {*} method i.e post, get, patch, delete
 * @param {*} url i.e BaseURL + Api-url
 * @param {*} body: formData || Object
 * @returns response only if status is 'OK'
 */

const Request = (method = "GET", url, data = null) =>
  new Promise((resolve, reject) => {
    instance({
      method,
      url,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

export default Request;
