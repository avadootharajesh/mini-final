import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inp">Enter the email of the friend</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="inp"
          id="inp"
        />
        <button type="submit">search</button>
      </form>
    </div>
  );
};

export default Page;
