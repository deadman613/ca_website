"use client";

import { createContext, useContext, useState } from "react";

export type Stream = "CA" | "CS";

interface StreamContextValue {
  stream: Stream;
  setStream: (stream: Stream) => void;
}

const StreamContext = createContext<StreamContextValue | null>(null);

export function StreamProvider({ children }: { children: React.ReactNode }) {
  const [stream, setStream] = useState<Stream>("CA");

  const chooseStream = (nextStream: Stream) => {
    setStream(nextStream);
  };

  return (
    <StreamContext.Provider value={{ stream, setStream: chooseStream }}>
      {children}
    </StreamContext.Provider>
  );
}

export function useStream() {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error("useStream must be used within a StreamProvider");
  }
  return context;
}
