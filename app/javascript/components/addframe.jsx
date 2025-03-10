import React, { useEffect, useState, useCallback } from "react";
import {
    AddFrame
} from "@farcaster/frame-sdk";

export default function AddToWarpcastFrame({context, added, actions}) {
  const [notificationDetails, setNotificationDetails] =
    useState(null);
  const [addFrameResult, setAddFrameResult] = useState("");

  useEffect(() => {
    setNotificationDetails(context?.client.notificationDetails ?? null);
  }, [context]);

  const addFrame = useCallback(async () => {
    try {
      setNotificationDetails(null);

      const result = await actions.addFrame();

      if (result.notificationDetails) {
        setNotificationDetails(result.notificationDetails);
      }
      setAddFrameResult(
        result.notificationDetails
          ? `Added, got notificaton token ${result.notificationDetails.token} and url ${result.notificationDetails.url}`
          : "Added, got no notification details"
      );
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
    <div className="w-[300px] mx-auto py-4 px-2">
      <div>
        <div>
          <div className="mt-2 mb-4 text-sm">
            Client fid {context?.client.clientFid},
            {added ? " frame added to client," : " frame not added to client,"}
            {notificationDetails
              ? " notifications enabled"
              : " notifications disabled"}
          </div>

          <div className="mb-4">
            {addFrameResult && (
              <div className="mb-2 text-sm">
                Add frame result: {addFrameResult}
              </div>
            )}
            <button onClick={addFrame} disabled={added} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add frame to client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
