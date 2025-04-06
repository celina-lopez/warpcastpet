import React, { useEffect, useState, useCallback } from "react";
import sdk from "@farcaster/frame-sdk";
import { createStore } from 'mipd';
import AddToWarpcastFrame from "./addframe";
import Transaction from "./transaction";
import Pet from "./pet";

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState();
  const [metadata, setMetadata] = useState();
  const [added, setAdded] = useState(false);

  const getVirtualPetData = useCallback(async (contextData) => {
      await fetch('/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({context: contextData})
      }).then(res => res.json()).then(data => {
        setMetadata(data);
      });
  }, []);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      setAdded(context.client.added);

      sdk.actions.ready({});

      const store = createStore(); // Set up a MIPD Store, and request Providers.
      store.subscribe(providerDetails => { // Subscribe to the MIPD Store.
        console.log("PROVIDER DETAILS", providerDetails) // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
      });

      getVirtualPetData(context);
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      return () => sdk.removeAllListeners();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) return <div>Loading...</div>;

  return (
    <div className='mb-[32px]'>
      <Instructions />
      {metadata && <Pet {...{...metadata, fid: context}} />}
      {!added && <AddToWarpcastFrame actions={sdk.actions} context={context} added={added} />}
      {context && <ShowContext context={context} />}
      {/* <Transaction /> */}
    </div>

  );
}

function ShowContext({context}) {
  return (
    <div className="p-4 mt-2 bg-gray-100 rounded-lg">
      <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
        {JSON.stringify(context, null, 2)}
      </pre>
    </div>
  )
}

function Instructions(){
  return (
    <p>
      @rug-pull-baddie to showcase your current virtual pet!
      <br/>
      <a href="TODO: add the url">Cast me!</a>
    </p>
  )
}

