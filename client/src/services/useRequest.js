import React, { useState } from 'react';
import apiRequest from './apiRequest';

const useRequest = ({ method, url, data, onSuccess, history }) => {
  const [errors, setError] = useState(null);
  const doRequest = async () => {
    setError(null);
    const res = await apiRequest({ method, url, data });
    // res.data should hold access and refresh tokens from server
    if (res.status !== 400) {
      onSuccess(res.data, history);
      return res.data;
    } else {
      const errorsToRender = res.data.map((err) => (
        <div key={err.param} className="row red-text text-darken-1">
          <div className="col 12s">{err.msg}</div>
        </div>
      ));
      setError(errorsToRender);
    }
  };

  return { doRequest, errors };
};

export default useRequest;
