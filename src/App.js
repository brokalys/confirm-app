import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import './App.css';

function App(props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [key, setKey] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    const params = queryString.parse(window.location.search);

    setKey(params.key);
    setId(params.id);
  }, []);

  async function confirm() {
    try {
      await axios.post('https://api.brokalys.com/', {
        query: `
          mutation {
            confirmPinger(
              id: ${id},
              confirm_key: "${key}",
            )
          }
        `
      });

      setSuccess(true);
    } catch (e) {
      setError(true);
    }
  }

  if (!key || !id) {
    return (
      <p className="feedback-error">Invalid link.</p>
    );
  }

  if (success) {
    return (
      <p className="feedback-success">Confirmed succesfully.</p>
    );
  }

  if (error) {
    return (
      <p className="feedback-error">Failed confirming. Please try again later.</p>
    );
  }

  return (
    <div>
      <p>Are you sure You want to confirm this PINGER?</p>
      <button onClick={confirm}>Yes</button>
    </div>
  );
}

export default App;
