import React, { useState, useCallback } from "react";
import {
    AddFrame
} from "@farcaster/frame-sdk";

export default function AddToWarpcastFrame({actions}) {
  const [addFrameResult, setAddFrameResult] = useState("");

  const addFrame = useCallback(async () => {
    try {
      await actions.addFrame();
    } catch (error) {
      if (error instanceof AddFrame.RejectedByUser) {
        setAddFrameResult(`Not added: ${error.message}`);
      }
      
      if (error instanceof AddFrame.InvalidDomainManifest) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  return (
    <div className="mb-4">
      {addFrameResult && (
        <div className="mb-2 text-sm">
          Add frame result: {addFrameResult}
        </div>
      )}
      <button onClick={addFrame} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add frame to client
      </button>
    </div>
  );
}
