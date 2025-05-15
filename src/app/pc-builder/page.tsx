import React from 'react';
import Layout from '@/components/layout/Layout';
import PcBuilder from '@/components/pc-builder/PcBuilder';

export const metadata = {
  title: 'PC Builder | Build Gaming',
  description: 'Create your custom gaming PC with our PC Builder tool',
};

const PcBuilderPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Custom PC Builder
        </h1>
        <p className="text-gray-400 mb-10 text-center max-w-3xl mx-auto">
          Select components to build your dream gaming PC. Our system will check compatibility and help you create the perfect build.
        </p>
        
        <PcBuilder />
      </div>
    </Layout>
  );
};

export default PcBuilderPage; 