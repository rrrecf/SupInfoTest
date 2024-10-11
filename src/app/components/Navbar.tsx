import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Générateur de Mèmes
        </Link>
        <Link href="/galery" className="text-white hover:text-blue-200">
          Galerie
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
