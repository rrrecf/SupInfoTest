"use client";

import React, { useRef, useEffect } from 'react';
import { Meme } from '../types/meme';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'; // Assurez-vous d'installer react-icons

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

  const handleShare = (platform: 'facebook' | 'instagram' | 'tiktok') => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "meme.png", { type: "image/png" });
          const shareData = {
            files: [file],
            title: 'Mon mème créé',
            text: 'Regardez ce mème que j\'ai créé !',
          };

          if (navigator.share && navigator.canShare(shareData)) {
            navigator.share(shareData)
              .then(() => console.log('Mème partagé avec succès'))
              .catch((error) => console.error('Erreur lors du partage:', error));
          } else {
            // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
            let url = '';
            switch (platform) {
              case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                break;
              case 'instagram':
                alert('Pour partager sur Instagram, sauvegardez l\'image et partagez-la depuis l\'application Instagram.');
                return;
              case 'tiktok':
                alert('Pour partager sur TikTok, sauvegardez l\'image et partagez-la depuis l\'application TikTok.');
                return;
            }
            window.open(url, '_blank');
          }
        }
      }, 'image/png');
    }
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="max-w-full h-auto border border-gray-300" />
      <div className="flex justify-between">
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Télécharger le mème
        </button>
        <div className="flex space-x-2">
          <button onClick={() => handleShare('facebook')} className="text-blue-600 hover:text-blue-800">
            <FaFacebook size={24} />
          </button>
          <button onClick={() => handleShare('instagram')} className="text-pink-600 hover:text-pink-800">
            <FaInstagram size={24} />
          </button>
          <button onClick={() => handleShare('tiktok')} className="text-black hover:text-gray-800">
            <FaTiktok size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemePreview;
