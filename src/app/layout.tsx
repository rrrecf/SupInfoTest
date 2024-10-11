import React from 'react';
import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: 'Générateur de Mèmes',
  description: 'Créez et partagez vos mèmes facilement',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}