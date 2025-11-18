import { Link } from 'react-router';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail 
} from 'lucide-react';
import { LuRotate3D } from 'react-icons/lu';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-teal-400 py-8 px-4 rounded-xl mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo & Main Links */}
        <div>
          <div className="flex items-center space-x-2 text-white">
            <LuRotate3D size={25}/>
            <span className="text-xl font-bold text-gray-100 dark:text-gray-200">Plabon Travel Hub</span>
          </div>
          <ul className="space-y-2 mt-4">
            <li><Link to="/destinations" className="text-gray-100 hover:text-yellow-300">All Destinations</Link></li>
            <li><Link to="/book-trip" className="text-gray-100 hover:text-yellow-300">Book a Trip</Link></li>
            <li><Link to="/profile" className="text-gray-100 hover:text-yellow-300">Profile</Link></li>
            <li><Link to="/auth/login" className="text-gray-100 hover:text-yellow-300">Login</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100 dark:text-gray-200">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/travel-blog" className="text-gray-100 hover:text-yellow-300">Travel Blog</Link></li>
            <li><Link to="/guides" className="text-gray-100 hover:text-yellow-300">Travel Guides</Link></li>
            <li><Link to="/tips" className="text-gray-100 hover:text-yellow-300">Travel Tips</Link></li>
            <li><Link to="/resources" className="text-gray-100 hover:text-yellow-300">Resources</Link></li>
          </ul>
        </div>
       

        {/* Community */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100 dark:text-gray-200">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/forums" className="text-gray-100 hover:text-yellow-300">Discussion Forums</Link></li>
            <li><Link to="/groups" className="text-gray-100 hover:text-yellow-300">Travel Groups</Link></li>
            <li><Link to="/events" className="text-gray-100 hover:text-yellow-300">Events & Workshops</Link></li>
            <li><Link to="/leaderboard" className="text-gray-100 hover:text-yellow-300">Leaderboard</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100 dark:text-gray-200">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue-800">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue-400">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-pink-500">
              <Instagram size={24} />
            </a>
          </div>
          <div>
            <a 
              href="mailto:support@plabontravel.com" 
              className="flex items-center text-gray-100 hover:text-yellow-300"
            >
              <Mail size={18} className="mr-2" /> support@plabontravel.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-teal-200 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-100">
          © {currentYear} Plabon Travel Hub. All Rights Reserved.
          <span className="ml-4">
            <Link to="/privacy-policy" className="hover:text-yellow-300 mr-3">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-300">Terms of Service</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
