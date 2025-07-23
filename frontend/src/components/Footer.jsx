import React from "react";
import CodeLogo from "./CodoLogo";
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 w-full p-6 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          {/* New Logo */}
          <CodeLogo/>
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} <span className="text-indigo-600 dark:text-indigo-400">DevClimb</span>. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-blue-400 transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 
                4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 
                4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 
                20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 
                0 0023 3z" />
            </svg>
          </a>

          <a
            href="#"
            aria-label="GitHub"
            className="hover:text-gray-700 dark:hover:text-white transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 
                5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61 
                -.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729 
                1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 
                3.495.997.107-.775.418-1.304.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 
                0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.524.105-3.176 
                0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013.005-.404 
                c1.02.005 2.045.138 3.005.404 2.28-1.552 3.285-1.23 
                3.285-1.23.645 1.652.24 2.873.12 3.176.765.84 
                1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 
                5.92.435.375.81 1.102.81 2.222 0 1.604-.015 
                2.896-.015 3.293 0 .315.21.69.825.573C20.565 
                21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-blue-500 transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 
                5v14c0 2.76 2.24 5 5 5h14c2.76 0 
                5-2.24 5-5v-14c0-2.76-2.24-5-5-5zM8 
                19h-3v-10h3v10zM6.5 7c-.97 0-1.75-.78-1.75-1.75S5.53 
                3.5 6.5 3.5 8.25 4.28 8.25 5.25 7.47 
                7 6.5 7zM20 19h-3v-5.5c0-1.38-1.12-2.5-2.5-2.5S12 
                12.12 12 13.5V19h-3v-10h3v1.32c.68-1.26 
                2.18-2.32 3.88-2.32 2.86 0 5.12 2.32 
                5.12 5.18V19z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
