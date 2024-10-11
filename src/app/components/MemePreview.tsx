"use client";

import React, { useRef, useEffect } from 'react';
import { Meme } from '../types/meme';

interface MemePreviewProps {
  meme: Meme;
}

const MemePreview: React.FC<MemePreviewProps> = ({ meme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx && meme.image) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        ctx.font = `${meme.fontSize}px Impact`;
        ctx.fillStyle = meme.textColor;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';

        const topX = (meme.topTextPosition.x / 100) * canvas.width;
        const topY = (meme.topTextPosition.y / 100) * canvas.height;
        ctx.fillText(meme.topText, topX, topY);
        ctx.strokeText(meme.topText, topX, topY);

        const bottomX = (meme.bottomTextPosition.x / 100) * canvas.width;
        const bottomY = (meme.bottomTextPosition.y / 100) * canvas.height;
        ctx.fillText(meme.bottomText, bottomX, bottomY);
        ctx.strokeText(meme.bottomText, bottomX, bottomY);
      };
      img.src = URL.createObjectURL(meme.image);
    }
  }, [meme]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="max-w-full h-auto border border-gray-300" />
      <button
        onClick={handleDownload}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Télécharger le mème
      </button>
    </div>
  );
};

export default MemePreview;
