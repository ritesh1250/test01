import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import apiUrl from "./config.json";
import auth from "./services/authServices";

const ENDPOINT = apiUrl.apiEnd;
const user = auth.getCurrentUser();
const queryParams={userId:user.id}

export default function ClientComponent() {
  const [response, setResponse] = useState("");
  
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT,{
        query: queryParams,
    });
    socket.on("FromAPI", data => {
      setResponse(data);
    });

  }, []);

  return (
    <></>
  );
}