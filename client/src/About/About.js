import React from "react";

function About() {
  return (
    <div>
      <h1>About Me</h1>
      <button onClick={testServer}>Click to Test Server</button>
    </div>
  );
}

async function testServer() {
  const address = "http://localhost:5000/testRoute";

  console.log("Sending a GET request to server.");
  try {
    const response = await fetch(address);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(
      `There was an error while trying to communicate with the server.\n${error}`
    );
  }
}

export default About;
