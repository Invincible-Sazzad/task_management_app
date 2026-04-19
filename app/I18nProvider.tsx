"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initI18n } from "@/lib/i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n("ja").then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}