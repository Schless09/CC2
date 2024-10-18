// pages/index.js

import Vapi from "@vapi-ai/web"; 
import { useState, useEffect } from "react";

const vapi = new Vapi("7e9d5c20-0056-4711-8d7d-4943e2fe36f9");

export default function VapiAssistant() {
  const [callStatus, setCallStatus] = useState("inactive");

  const start = async () => {
    setCallStatus("loading");
    const response = vapi.start("620d8529-101d-4535-a417-95046c968115");
  };

  const stop = () => {
    setCallStatus("loading");
    vapi.stop();
  };

  useEffect(() => {
    vapi.on("call-start", () => setCallStatus("active"));
    vapi.on("call-end", () => setCallStatus('inactive'));
    return () => vapi.removeAllListeners();
  }, []);

  return (
    <div>
      {callStatus === "inactive" ? (<button onClick={start}>Start</button>) : null}
      {callStatus === "loading" ? <i>Loading...</i> : null}
      {callStatus === "active" ? (<button onClick={stop}>Stop</button>) : null}
    </div>
  );
}
