import React, { useState } from 'react';
import apiRequest from './apiRequest';
import authApiRequest from './authApiRequest';

const useRequest = (
  { method, url, data, onSuccess, history },
  isAuthRequest
) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    setErrors(null);
    const res = isAuthRequest
      ? await authApiRequest({
          method,
          url,
          data,
          extraHeaders: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        })
      : await apiRequest({ method, url, data });
    // res.data should hold access and refresh tokens from server
    if (res.status !== 400) {
      onSuccess(res.data, history);
      return res.data;
    } else {
      const errorsToRender = res.data.map((err) => (
        <div key={err.httpCode} className="row red-text text-darken-1">
          <div className="col 12s">{err.message}</div>
        </div>
      ));
      setErrors(errorsToRender);
    }
  };

  return { doRequest, errors };
};

export default useRequest;
