import React, { useState, useCallback, useMemo } from "react";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useDisconnect,
  useConnect,
  useSwitchChain,
  useChainId,
} from "wagmi";
import { config } from '../providers/WagmiProvider';
import { truncateAddress } from "../lib/truncateAddress";
import { base, degen, mainnet, optimism } from "wagmi/chains";
import { BaseError, UserRejectedRequestError } from "viem";

export default function Transaction() {
  const [txHash, setTxHash] = useState(null);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  const {
    signTypedData,
    error: signTypedError,
    isError: isSignTypedError,
    isPending: isSignTypedPending,
  } = useSignTypedData();

  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  const {
    switchChain,
    error: switchChainError,
    isError: isSwitchChainError,
    isPending: isSwitchChainPending,
  } = useSwitchChain();

  const nextChain = useMemo(() => {
    if (chainId === base.id) {
      return optimism;
    } else if (chainId === optimism.id) {
      return degen;
    } else if (chainId === degen.id) {
      return mainnet;
    } else {
      return base;
    }
  }, [chainId]);

   const handleSwitchChain = useCallback(() => {
    switchChain({ chainId: nextChain.id });
  }, [switchChain, chainId]);

  const sendTx = useCallback(() => {
    sendTransaction(
      {
        to: "0x9c18ed156bea6cae70676d3bc860971ca236f5fd", // send to me lol
        data: "0x9846cd9efc000023c0",
      },
      {
        onSuccess: (hash) => {
          setTxHash(hash);
        },
      }
    );
  }, [sendTransaction]);

 const signTyped = useCallback(() => {
    signTypedData({
      domain: {
        name: "Frames v2 Demo WORKS????",
        version: "1",
        chainId,
      },
      types: {
        Message: [{ name: "content", type: "string" }],
      },
      message: {
        content: "testing thissssss",
      },
      primaryType: "Message",
    });
  }, [chainId, signTypedData]);

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <h2 className="font-2xl font-bold">Wallet</h2>
      {address && (
        <div className="my-2 text-xs">
          Address: <pre className="inline">{address}</pre>
        </div>
      )}
      {chainId && (
        <div className="my-2 text-xs">
          Chain ID: <pre className="inline">{chainId}</pre>
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() =>
            isConnected
              ? disconnect()
              : connect({ connector: config.connectors[0] })
          }
        >
          {isConnected ? "Disconnect" : "Connect"}
        </button>
      </div>

      <div className="mb-4">
        <SignMessage />
      </div>

      {isConnected && (
        <>
          <div className="mb-4">
            <SendEth />
          </div>
          <div className="mb-4">
            <button
              onClick={sendTx}
              disabled={!isConnected || isSendTxPending}
              isLoading={isSendTxPending}
            >
              Send Transaction (contract)
            </button>
            {isSendTxError && renderError(sendTxError)}
            {txHash && (
              <div className="mt-2 text-xs">
                <div>Hash: {truncateAddress(txHash)}</div>
                <div>
                  Status:{" "}
                  {isConfirming
                    ? "Confirming..."
                    : isConfirmed
                    ? "Confirmed!"
                    : "Pending"}
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <button
              onClick={signTyped}
              disabled={!isConnected || isSignTypedPending}
              isLoading={isSignTypedPending}
            >
              Sign Typed Data
            </button>
            {isSignTypedError && renderError(signTypedError)}
          </div>
          <div className="mb-4">
            <button
              onClick={handleSwitchChain}
              disabled={isSwitchChainPending}
              isLoading={isSwitchChainPending}
            >
              Switch to {nextChain.name}
            </button>
            {isSwitchChainError && renderError(switchChainError)}
          </div>
        </>
      )}
    </div>
  );
}

function SignMessage() {
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const {
    signMessage,
    data: signature,
    error: signError,
    isError: isSignError,
    isPending: isSignPending,
  } = useSignMessage();

  const handleSignMessage = useCallback(async () => {
    if (!isConnected) {
      await connectAsync({
        chainId: base.id,
        connector: config.connectors[0],
      });
    }

    signMessage({ message: "Hello from Frames v2!" });
  }, [connectAsync, isConnected, signMessage]);

  return (
    <>
      <button
        onClick={handleSignMessage}
        disabled={isSignPending}
        isLoading={isSignPending}
      >
        Sign Message
      </button>
      {isSignError && renderError(signError)}
      {signature && (
        <div className="mt-2 text-xs">
          <div>Signature: {signature}</div>
        </div>
      )}
    </>
  );
}

function SendEth() {
  const { isConnected, chainId } = useAccount();
  const {
    sendTransaction,
    data,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const toAddr = useMemo(() => {
    // Protocol guild address
    return chainId === base.id
      ? "0x32e3C7fD24e175701A35c224f2238d18439C7dBC"
      : "0xB3d8d7887693a9852734b4D25e9C0Bb35Ba8a830";
  }, [chainId]);

  const handleSend = useCallback(() => {
    sendTransaction({
      to: toAddr,
      value: 1n,
    });
  }, [toAddr, sendTransaction]);

  return (
    <>
      <button
        onClick={handleSend}
        disabled={!isConnected || isSendTxPending}
        isLoading={isSendTxPending}
      >
        Send Transaction (eth)
      </button>
      {isSendTxError && renderError(sendTxError)}
      {data && (
        <div className="mt-2 text-xs">
          <div>Hash: {truncateAddress(data)}</div>
          <div>
            Status:{" "}
            {isConfirming
              ? "Confirming..."
              : isConfirmed
              ? "Confirmed!"
              : "Pending"}
          </div>
        </div>
      )}
    </>
  );
}

const renderError = (error) => {
  if (!error) return null;
  if (error instanceof BaseError) {
    const isUserRejection = error.walk(
      (e) => e instanceof UserRejectedRequestError
    );

    if (isUserRejection) {
      return <div className="text-red-500 text-xs mt-1">Rejected by user.</div>;
    }
  }

  return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
};
