"use client";

import React from 'react';
import { Meme } from '../types/meme';

interface MemeFormProps {
  meme: Meme;
  setMeme: React.Dispatch<React.SetStateAction<Meme>>;
}

const MemeForm: React.FC<MemeFormProps> = ({ meme, setMeme }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMeme({ ...meme, image: e.target.files[0] });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeme({ ...meme, [name]: value });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeme({ ...meme, fontSize: Number(e.target.value) });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeme({ ...meme, textColor: e.target.value });
  };

  const handlePositionChange = (text: 'top' | 'bottom', axis: 'x' | 'y', value: number) => {
    setMeme({
      ...meme,
      [`${text}TextPosition`]: {
        ...meme[`${text}TextPosition`],
        [axis]: value
      }
    });
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Télécharger une image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <div>
        <label htmlFor="topText" className="block text-sm font-medium text-gray-700">
          Texte du haut
        </label>
        <input
          type="text"
          id="topText"
          name="topText"
          value={meme.topText}
          onChange={handleTextChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="bottomText" className="block text-sm font-medium text-gray-700">
          Texte du bas
        </label>
        <input
          type="text"
          id="bottomText"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleTextChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
          Taille de la police
        </label>
        <input
          type="range"
          id="fontSize"
          min="10"
          max="100"
          value={meme.fontSize}
          onChange={handleFontSizeChange}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label htmlFor="textColor" className="block text-sm font-medium text-gray-700">
          Couleur du texte
        </label>
        <input
          type="color"
          id="textColor"
          value={meme.textColor}
          onChange={handleColorChange}
          className="mt-1 block"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Position du texte du haut</label>
        <div className="flex space-x-2">
          <input
            type="range"
            min="0"
            max="100"
            value={meme.topTextPosition.x}
            onChange={(e) => handlePositionChange('top', 'x', Number(e.target.value))}
            className="mt-1 block w-full"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={meme.topTextPosition.y}
            onChange={(e) => handlePositionChange('top', 'y', Number(e.target.value))}
            className="mt-1 block w-full"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Position du texte du bas</label>
        <div className="flex space-x-2">
          <input
            type="range"
            min="0"
            max="100"
            value={meme.bottomTextPosition.x}
            onChange={(e) => handlePositionChange('bottom', 'x', Number(e.target.value))}
            className="mt-1 block w-full"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={meme.bottomTextPosition.y}
            onChange={(e) => handlePositionChange('bottom', 'y', Number(e.target.value))}
            className="mt-1 block w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default MemeForm;
