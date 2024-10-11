"use client";

import React from 'react';
import MemeForm from '../components/MemeForm';
import MemePreview from '../components/MemePreview';
import Navbar from '../components/Navbar';
import { Meme } from '../types/meme';

export default function Home() {
  const [meme, setMeme] = React.useState<Meme>({
    image: null,
    topText: '',
    bottomText: '',
    fontSize: 30,
    textColor: '#ffffff',
    topTextPosition: { x: 50, y: 10 },
    bottomTextPosition: { x: 50, y: 90 },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Générateur de Mèmes</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <MemeForm meme={meme} setMeme={setMeme} />
          </div>
          <div className="w-full md:w-1/2">
            <MemePreview meme={meme} />
          </div>
        </div>
      </main>
    </div>
  );
}
