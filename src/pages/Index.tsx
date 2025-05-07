
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import SectionLinks from '@/components/home/SectionLinks';
import LatestWorks from '@/components/home/LatestWorks';
import LatestBlogPosts from '@/components/home/LatestBlogPosts';
import ContactCTA from '@/components/home/ContactCTA';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <SectionLinks />
      <LatestWorks />
      <LatestBlogPosts />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
