import React from 'react';
import { Hero } from '@/components/home-screen/hero/Hero';
import System from '@/components/home-screen/system/System';
import Memory from '@/components/home-screen/memory/Memory';
import Chronicles from '@/components/home-screen/chronicles/Chronicles';
import Architecture from '@/components/home-screen/architecture/Architecture';
import Blog from '@/components/home-screen/blog/Blog';
import  Subscribe from '@/components/home-screen/subscribe/subscribe';
import Application from '@/components/home-screen/application/Application';

const page = () => {
  return (
    <main className="w-full min-h-screen bg-[#020215]">
      <Hero />
      <Memory />
      <System />
      <Chronicles />
      <Architecture />
      <Blog />
      <Application />
      <Subscribe />
    </main>
  );
};

export default page;
