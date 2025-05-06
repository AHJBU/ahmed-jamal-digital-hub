
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import SectionLinks from '@/components/home/SectionLinks';
import LatestWorks from '@/components/home/LatestWorks';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <SectionLinks />
      <LatestWorks />
    </Layout>
  );
};

export default Index;
