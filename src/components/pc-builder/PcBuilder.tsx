"use client";

import React, { useState } from 'react';
import { ChevronRight, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import ComponentSelector from './ComponentSelector';
import PriceCalculator from './PriceCalculator';
import { ComponentType, SelectedComponent, PcBuild } from '@/types/pc-builder';
import { useCart } from '@/context/CartContext';

const initialBuild: PcBuild = {
  cpu: null,
  motherboard: null,
  memory: null,
  storage: null,
  gpu: null,
  case: null,
  powerSupply: null,
  cooling: null,
};

const PcBuilder = () => {
  const [build, setBuild] = useState<PcBuild>(initialBuild);
  const [activeCategoryId, setActiveCategoryId] = useState<ComponentType | null>(null);
  const { addToCart } = useCart();
  
  const handleComponentSelect = (type: ComponentType, component: SelectedComponent) => {
    setBuild(prev => ({
      ...prev,
      [type]: component
    }));
    setActiveCategoryId(null);
  };
  
  const handleCategoryClick = (categoryId: ComponentType) => {
    setActiveCategoryId(categoryId === activeCategoryId ? null : categoryId);
  };
  
  const totalComponents = Object.keys(build).length;
  const selectedComponents = Object.values(build).filter(component => component !== null).length;
  const completionPercentage = (selectedComponents / totalComponents) * 100;
  
  const isCompatible = true; // In a real implementation, this would be calculated based on the selected components
  
  // Calculate total price for the build
  const buildTotal = Object.values(build).reduce((sum, comp) => sum + (comp?.price || 0), 0);

  // Add build to cart as a single item
  const handleAddBuildToCart = () => {
    const buildName = `Custom PC Build (${Object.values(build).filter(Boolean).length} parts)`;
    // Use the case image if available, else first component image, else a default
    const firstImage = build.case?.image || Object.values(build).find(c => c)?.image || '/images/pc-builder.png';
    addToCart({
      id: `build-${Date.now()}`,
      name: buildName,
      price: buildTotal,
      image: firstImage,
    });
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main component selection area */}
      <div className="flex-grow">
        {/* Progress indicator */}
        <div className="bg-card border border-border rounded-md p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Build Progress</h3>
            <span className="text-sm text-gray-400">{selectedComponents}/{totalComponents} components selected</span>
          </div>
          <div className="w-full bg-background rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          {selectedComponents === totalComponents && (
            <div className="flex items-center mt-2 text-green-500 text-sm">
              <CheckCircle2 size={16} className="mr-1" />
              All components selected!
            </div>
          )}
        </div>
        
        {/* Component categories */}
        <div className="bg-card border border-border rounded-md overflow-hidden mb-6">
          <ComponentCategory 
            type="cpu"
            title="Processor (CPU)"
            description="The brain of your PC"
            selectedComponent={build.cpu}
            isActive={activeCategoryId === 'cpu'}
            onClick={() => handleCategoryClick('cpu')}
          />
          
          {activeCategoryId === 'cpu' && (
            <ComponentSelector
              type="cpu"
              onSelect={(component) => handleComponentSelect('cpu', component)}
              currentSelection={build.cpu}
            />
          )}
          
          <ComponentCategory 
            type="motherboard"
            title="Motherboard"
            description="The foundation connecting all components"
            selectedComponent={build.motherboard}
            isActive={activeCategoryId === 'motherboard'}
            onClick={() => handleCategoryClick('motherboard')}
          />
          
          {activeCategoryId === 'motherboard' && (
            <ComponentSelector
              type="motherboard"
              onSelect={(component) => handleComponentSelect('motherboard', component)}
              currentSelection={build.motherboard}
            />
          )}
          
          <ComponentCategory 
            type="memory"
            title="Memory (RAM)"
            description="Temporary high-speed storage for running applications"
            selectedComponent={build.memory}
            isActive={activeCategoryId === 'memory'}
            onClick={() => handleCategoryClick('memory')}
          />
          
          {activeCategoryId === 'memory' && (
            <ComponentSelector
              type="memory"
              onSelect={(component) => handleComponentSelect('memory', component)}
              currentSelection={build.memory}
            />
          )}
          
          <ComponentCategory 
            type="storage"
            title="Storage (SSD/HDD)"
            description="Long-term data storage for OS and files"
            selectedComponent={build.storage}
            isActive={activeCategoryId === 'storage'}
            onClick={() => handleCategoryClick('storage')}
          />
          
          {activeCategoryId === 'storage' && (
            <ComponentSelector
              type="storage"
              onSelect={(component) => handleComponentSelect('storage', component)}
              currentSelection={build.storage}
            />
          )}
          
          <ComponentCategory 
            type="gpu"
            title="Graphics Card (GPU)"
            description="Processes and renders graphics for display"
            selectedComponent={build.gpu}
            isActive={activeCategoryId === 'gpu'}
            onClick={() => handleCategoryClick('gpu')}
          />
          
          {activeCategoryId === 'gpu' && (
            <ComponentSelector
              type="gpu"
              onSelect={(component) => handleComponentSelect('gpu', component)}
              currentSelection={build.gpu}
            />
          )}
          
          <ComponentCategory 
            type="case"
            title="Case"
            description="The housing enclosure for all components"
            selectedComponent={build.case}
            isActive={activeCategoryId === 'case'}
            onClick={() => handleCategoryClick('case')}
          />
          
          {activeCategoryId === 'case' && (
            <ComponentSelector
              type="case"
              onSelect={(component) => handleComponentSelect('case', component)}
              currentSelection={build.case}
            />
          )}
          
          <ComponentCategory 
            type="powerSupply"
            title="Power Supply (PSU)"
            description="Provides power to all components"
            selectedComponent={build.powerSupply}
            isActive={activeCategoryId === 'powerSupply'}
            onClick={() => handleCategoryClick('powerSupply')}
          />
          
          {activeCategoryId === 'powerSupply' && (
            <ComponentSelector
              type="powerSupply"
              onSelect={(component) => handleComponentSelect('powerSupply', component)}
              currentSelection={build.powerSupply}
            />
          )}
          
          <ComponentCategory 
            type="cooling"
            title="CPU Cooling"
            description="Keeps your CPU running at safe temperatures"
            selectedComponent={build.cooling}
            isActive={activeCategoryId === 'cooling'}
            onClick={() => handleCategoryClick('cooling')}
          />
          
          {activeCategoryId === 'cooling' && (
            <ComponentSelector
              type="cooling"
              onSelect={(component) => handleComponentSelect('cooling', component)}
              currentSelection={build.cooling}
            />
          )}
        </div>
        
        {/* Compatibility check */}
        <div className={`mb-6 p-4 rounded-md ${isCompatible ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <div className="flex items-start">
            {isCompatible ? (
              <>
                <CheckCircle2 className="text-green-500 mr-2 mt-0.5" size={18} />
                <div>
                  <p className="font-medium text-green-500">All components are compatible</p>
                  <p className="text-sm text-gray-400">Your selected components work well together</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="text-red-500 mr-2 mt-0.5" size={18} />
                <div>
                  <p className="font-medium text-red-500">Compatibility issues detected</p>
                  <p className="text-sm text-gray-400">Please check the warnings below</p>
                  {/* This would list specific compatibility issues in a real implementation */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Price summary sidebar */}
      <div className="lg:w-80 shrink-0">
        <div className="bg-card border border-border rounded-md p-6 sticky top-24">
          <h3 className="font-bold text-lg mb-4">Build Summary</h3>
          
          {/* Price calculator component */}
          <PriceCalculator build={build} />
          
          <div className="space-y-3 mt-6">
            <Button 
              fullWidth 
              disabled={selectedComponents !== totalComponents || !isCompatible}
              className="bg-gradient-to-r from-primary to-accent border-0"
              onClick={handleAddBuildToCart}
            >
              Add To Cart
            </Button>
            
            <Button 
              fullWidth 
              variant="outline"
              onClick={() => setBuild(initialBuild)}
            >
              Reset Build
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-start text-xs text-gray-400">
              <Info size={14} className="mr-2 mt-0.5 shrink-0" />
              <p>Need help choosing components? Check our <a href="/guides" className="text-primary hover:underline">PC Building Guides</a> or <a href="/contact" className="text-primary hover:underline">contact our experts</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component Category item
interface ComponentCategoryProps {
  type: ComponentType;
  title: string;
  description: string;
  selectedComponent: SelectedComponent | null;
  isActive: boolean;
  onClick: () => void;
}

const ComponentCategory = ({ 
  title, 
  description, 
  selectedComponent, 
  isActive, 
  onClick 
}: ComponentCategoryProps) => {
  return (
    <div 
      className={`border-b border-border last:border-b-0 cursor-pointer transition-colors hover:bg-background/50 ${isActive ? 'bg-background/80' : ''}`}
      onClick={onClick}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex-grow">
          <div className="flex items-center">
            <h3 className="font-medium">{title}</h3>
            {selectedComponent && (
              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                Selected
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400">{description}</p>
          {selectedComponent && (
            <div className="mt-1 text-sm">
              <span className="font-medium text-white">{selectedComponent.name}</span>
              <span className="text-primary ml-2">₹{selectedComponent.price.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className="shrink-0 flex items-center">
          {!selectedComponent && (
            <span className="text-xs bg-accent/10 text-accent mr-2 px-2 py-0.5 rounded-full">
              Required
            </span>
          )}
          <ChevronRight 
            size={20} 
            className={`transition-transform ${isActive ? 'rotate-90' : ''}`} 
          />
        </div>
      </div>
    </div>
  );
};

export default PcBuilder; 