import { Github, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Footer Left Section */}
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Developed by <span className="font-semibold text-green-600">Shivam ❣️</span>
            </span>
          </div>

          {/* Footer Right Section */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/shibbu04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/shivamsingh57680"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://shivam04.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
              aria-label="Portfolio"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
