"use client";

import { ReactNode } from "react";

import ProtectedClient from "./ProtectedClient";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ProtectedClient>{children}</ProtectedClient>
    </>
  );
}