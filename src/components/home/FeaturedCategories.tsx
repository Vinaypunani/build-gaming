import Link from 'next/link';
import { Cpu, HardDrive, Gpu, Monitor, Headphones, Keyboard } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const CategoryCard = ({ title, description, icon, href }: CategoryCardProps) => (
  <Link 
    href={href}
    className="group flex flex-col items-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-md hover:shadow-primary/10 text-center"
  >
    <div className="p-4 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </Link>
);

const FeaturedCategories = () => {
  const categories = [
    {
      title: "Processors",
      description: "High-performance CPUs from AMD & Intel",
      icon: <Cpu size={32} className="text-primary" />,
      href: "/products/processors"
    },
    {
      title: "Graphics Cards",
      description: "Gaming & workstation GPUs for any build",
      icon: <Gpu size={32} className="text-primary" />,
      href: "/products/graphics-cards"
    },
    {
      title: "Storage",
      description: "SSDs & HDDs for lightning-fast performance",
      icon: <HardDrive size={32} className="text-primary" />,
      href: "/products/storage"
    },
    {
      title: "Monitors",
      description: "High-refresh gaming & professional displays",
      icon: <Monitor size={32} className="text-primary" />,
      href: "/products/monitors"
    },
    {
      title: "Headsets",
      description: "Gaming & audiophile-grade headsets",
      icon: <Headphones size={32} className="text-primary" />,
      href: "/products/headsets"
    },
    {
      title: "Keyboards",
      description: "Mechanical & membrane keyboards",
      icon: <Keyboard size={32} className="text-primary" />,
      href: "/products/keyboards"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of PC components and accessories to build your perfect gaming or workstation setup
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 