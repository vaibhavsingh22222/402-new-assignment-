import React from 'react';
import { Container } from './Layout';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ecfdf5] text-green-900 py-20 border-t border-[#bbf7d0]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#bbf7d0] pb-16">
          
          {/* Brand */}
          <div className="col-span-1">
            <div className="text-green-600 text-2xl font-black mb-6 italic">
              COVENTRY ECO-CONNECT
            </div>
            <p className="text-sm text-green-800 leading-relaxed">
              Connecting people to share, reuse, and build a greener community 🌱
            </p>
          </div>
          
          {/* Sections */}
          {['Explore', 'Platform', 'Company'].map((section) => (
            <div key={section}>
              <h4 className="text-green-900 font-bold mb-6">{section}</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-green-600 transition-colors">
                    Web Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-600 transition-colors">
                    Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-600 transition-colors">
                    Free Assets
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest font-semibold text-green-800">
          <p>© {new Date().getFullYear()} Eco-Connect. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-green-600">Privacy</a>
            <a href="#" className="hover:text-green-600">Terms</a>
            <a href="#" className="hover:text-green-600">Github</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;