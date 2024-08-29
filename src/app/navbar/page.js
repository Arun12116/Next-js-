import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          My Website
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-gray-200">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/loginPage" className="text-white hover:text-gray-200">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
