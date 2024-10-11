"use client";

import React from 'react';
import MemeGenerator from './components/MemeGenerator';
import Navbar from './components/Navbar';
import { Meme } from './types/meme';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Générateur de Mèmes</h1>
        <MemeGenerator />
      </main>
    </div>
  );
}