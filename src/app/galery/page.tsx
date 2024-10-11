"use client";

import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Navbar from '../components/Navbar';

interface Meme {
  id: string;
  imageUrl: string;
  topText: string;
  bottomText: string;
}

export default function Gallery() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      const memesCollection = collection(db, 'memes');
      const q = query(memesCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const memesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Meme));
      setMemes(memesData);
    };

    fetchMemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Galerie de Mèmes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <div key={meme.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={meme.imageUrl} alt="Meme" className="w-full h-64 object-cover" />
              <div className="p-4">
                <p className="text-lg font-semibold">{meme.topText}</p>
                <p className="text-lg font-semibold">{meme.bottomText}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}