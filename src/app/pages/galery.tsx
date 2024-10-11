import React from 'react';
import Navbar from '../components/Navbar';

const Gallery: React.FC = () => {
  // Ici, vous devrez implémenter la logique pour récupérer et afficher les mèmes sauvegardés
  // Pour l'instant, nous allons simplement afficher un message placeholder

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Galerie de Mèmes</h1>
        <p className="text-center text-gray-600">
          Ici seront affichés les mèmes sauvegardés. Cette fonctionnalité sera implémentée ultérieurement.
        </p>
      </main>
    </div>
  );
};

export default Gallery;
