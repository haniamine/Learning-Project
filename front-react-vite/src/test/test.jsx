import React from "react";

export default function test() {
  const [message, setMessage] = useState("")
  const [imessage, setIMessage] = useState("")
  return (
    <>

      <input type="text"  value={imessage} onChange={(e)=> setIMessage(e.target.value)}/>
      <button onClick={() => setMessage(imessage)}>Click</button>

      <div>{message}</div>
    </>
  );
}
