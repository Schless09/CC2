
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <footer className='bg-black text-white py-8 px-4 sm:px-6'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Logo and Company Name */}
          <div className='flex flex-col items-center md:items-start'>
            <Link href='/'>
              <span className='flex items-center'>
                <Image
                  src='/images/cc on black.png'
                  alt='Logo'
                  width={50}
                  height={50}
                  className='rounded-full'
                />
                <span className='ml-3 text-xl font-semibold'>
                  Coder Collective
                </span>
              </span>
            </Link>
            <p className='mt-4 text-sm text-gray-400'>© 2024 - All Rights Reserved</p>
          </div>

          {/* Navigation Links */}
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <h3 className='font-semibold mb-2 text-magenta'>Quick Links</h3>
              <ul className='space-y-2'>
                <li><Link href='/dashboard'><span className='hover:text-magenta transition-colors'>Dashboard</span></Link></li>
                <li><Link href='/referrals'><span className='hover:text-magenta transition-colors'>Refer Candidates</span></Link></li>
                <li><Link href='/introClient'><span className='hover:text-magenta transition-colors'>Intro Clients</span></Link></li>
                <li><Link href='/candidates'><span className='hover:text-magenta transition-colors'>Candidates</span></Link></li>
                <li><Link href='/openings'><span className='hover:text-magenta transition-colors'>Openings</span></Link></li>
                <li><Link href='/hiring-manager'><span className='hover:text-magenta transition-colors'>Hiring Managers</span></Link></li>
                <li><Link href='/blog'><span className='hover:text-magenta transition-colors'>Blog</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-2 text-magenta'>Support</h3>
              <ul className='space-y-2'>
                <li><Link href='/FAQs'><span className='hover:text-magenta transition-colors'>FAQs</span></Link></li>
                <li><Link href='/legal/privacy'><span className='hover:text-magenta transition-colors'>Privacy Policy</span></Link></li>
                <li><Link href='/legal/terms'><span className='hover:text-magenta transition-colors'>Terms & Conditions</span></Link></li>
              </ul>
            </div>
          </div>

          {/* Social Media and Newsletter */}
          <div className='flex flex-col items-center md:items-end'>
            <div className='flex space-x-4 mb-4'>
              <Link href='https://www.linkedin.com/company/the-coder-collective'>
                <span className='text-white hover:text-magenta transition-colors'>
                  <LinkedInIcon fontSize="large" />
                </span>
              </Link>
              <Link href='https://x.com/codercollective'>
                <span className='text-white hover:text-magenta transition-colors'>
                  <XIcon fontSize="large" />
                </span>
              </Link>
            </div>
            <div className='mt-4'>
              <h3 className='font-semibold mb-2 text-magenta'>Stay Updated</h3>
              <form className='flex'>
                <input
                  type="email"
                  placeholder="Your email"
                  className='bg-gray-800 text-white px-3 py-2 rounded-l-md focus:outline-none'
                />
                <button
                  type="submit"
                  className='bg-magenta text-white px-4 py-2 rounded-r-md hover:bg-gray-400 transition-colors'
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;