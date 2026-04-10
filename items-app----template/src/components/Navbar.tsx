import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Layout';
import { Button } from './Button';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from 'aws-amplify/auth';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator();
  const [name, setName] = useState('');

  useEffect(() => {
    const loadAttributes = async () => {
      if (user) {
        const attrs = await fetchUserAttributes();
        setName(
          attrs.name ||
          attrs.given_name ||
          attrs.email ||
          user.username
        );
      }
    };
    loadAttributes();
  }, [user]);

  return (
    <>
      <nav  className="sticky top-0 z-50 bg-[#EAE4D6] backdrop-blur-xl border-b border-[#D3CAB8]">
        <Container>
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="text-2xl font-black italic text-[#5A8A1F] tracking-tighter">
              COVENTRY <span className="text-[#3A3A2A]">ECO-CONNECT</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              {[
                { label: 'Home', to: '/' },
                { label: 'Items', to: '/items' },
                 { label: 'Admin', to: '/Admin' },
                 { label: 'Reviews', to: '/review' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-bold text-[#6A6A5A] hover:text-[#5A8A1F] transition-colors uppercase tracking-widest"
                  >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Group */}
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <span>Hi {name}</span>
                  <Button variant='info' onClick={signOut}> Sign out </Button>
                </>
              ) : (
                <span> Sign In or Register to see more</span>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;