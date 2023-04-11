import Axios from "axios";


export const axiosHandler = ({
    method = "",
    url = "",
    token = null,
    data = {},
    extra = null,
  }) => {
    let methodType = method.toUpperCase();
    if (
      ["GET", "POST", "PATCH", "PUT", "DELETE"].includes(methodType) ||
      {}.toString(data) !== "[object Object]"
    ) {
      let axiosProps = { method: methodType, url, data };
  
      if (token) {
        axiosProps.headers = { Authorization: `Bearer ${token}` };
      }
      if (extra) {
        axiosProps.headers = { ...axiosProps.headers, ...extra };
      }
      return Axios(axiosProps);
    } else {
      alert(`method ${methodType} is not accepted or data is not an object`);
    }
  };