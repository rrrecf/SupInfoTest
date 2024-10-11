"use client";

import React, { useState } from 'react';
import { storage, db } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import MemeForm from './MemeForm';
import MemePreview from './MemePreview';
import { Meme } from '../types/meme';

const MemeGenerator: React.FC = () => {
  const [meme, setMeme] = useState<Meme>({
    image: null,
    topText: '',
    bottomText: '',
    fontSize: 30,
    textColor: '#ffffff',
    topTextPosition: { x: 50, y: 10 },
    bottomTextPosition: { x: 50, y: 90 },
  });

  const handleSaveMeme = async () => {
    if (meme.image) {
      try {
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `memes/${meme.image.name}`);
        await uploadBytes(storageRef, meme.image);
        const imageUrl = await getDownloadURL(storageRef);

        // Save meme data to Firestore
        await addDoc(collection(db, "memes"), {
          imageUrl,
          topText: meme.topText,
          bottomText: meme.bottomText,
          fontSize: meme.fontSize,
          textColor: meme.textColor,
          topTextPosition: meme.topTextPosition,
          bottomTextPosition: meme.bottomTextPosition,
          createdAt: new Date()
        });

        alert("Mème sauvegardé avec succès!");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du mème:", error);
        alert("Erreur lors de la sauvegarde du mème.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <MemeForm meme={meme} setMeme={setMeme} />
      </div>
      <div className="w-full md:w-1/2">
        <MemePreview meme={meme} />
        <button
          onClick={handleSaveMeme}
          className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Sauvegarder le mème
        </button>
      </div>
    </div>
  );
};

export default MemeGenerator;