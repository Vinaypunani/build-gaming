import Button from '../ui/Button';
import { Cpu, Gpu, HardDrive, Fan } from 'lucide-react';

const BuildPcCta = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-background to-primary/10 relative overflow-hidden">
      {/* Animated background icons */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-20 -left-20 text-primary/20 animate-spin-slow">
          <Cpu size={240} />
        </div>
        <div className="absolute top-1/2 right-10 text-secondary/20 animate-float">
          <Gpu size={180} />
        </div>
        <div className="absolute bottom-10 left-1/4 text-accent/20 animate-pulse">
          <HardDrive size={150} />
        </div>
        <div className="absolute top-1/3 left-2/3 text-primary/20 animate-spin-slow">
          <Fan size={120} />
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Build Your </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dream PC</span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-8">
            Use our intuitive PC Builder tool to create a custom gaming rig tailored to your exact needs and budget.
            Our intelligent compatibility checker ensures all components work perfectly together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-3">Expert Recommendations</h3>
              <p className="text-gray-400">
                Get smart component suggestions based on your usage needs and budget constraints
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-3">Compatibility Guaranteed</h3>
              <p className="text-gray-400">
                Our system checks all components for compatibility as you build your dream PC
              </p>
            </div>
          </div>
          
          <Button href="/pc-builder" size="lg">
            Start Building Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BuildPcCta; 