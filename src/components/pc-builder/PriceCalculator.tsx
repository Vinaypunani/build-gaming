import React from 'react';
import { PcBuild } from '@/types/pc-builder';

interface PriceCalculatorProps {
  build: PcBuild;
}

const PriceCalculator = ({ build }: PriceCalculatorProps) => {
  // Calculate price totals
  const selectedComponents = Object.values(build).filter(Boolean);
  const subtotal = selectedComponents.reduce((total, component) => total + (component?.price || 0), 0);
  
  // Calculate discounts
  const savings = selectedComponents.reduce((total, component) => total + (component?.discount || 0), 0);
  
  // Shipping estimate
  const shippingEstimate = subtotal > 1000 ? 0 : 49.99;
  
  // Assembly fee if needed
  const assemblyFee = 99.99;
  
  // Calculate total
  const total = subtotal + shippingEstimate + assemblyFee;
  
  return (
    <div>
      <div className="space-y-3">
        {/* Selected components list */}
        {selectedComponents.length > 0 ? (
          <div className="space-y-2">
            {Object.entries(build).map(([type, component]) => (
              component && (
                <div key={type} className="flex justify-between text-sm">
                  <span className="text-gray-400">{formatComponentType(type as keyof PcBuild)}</span>
                  <span>₹{component.price.toLocaleString()}</span>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm py-2">
            No components selected yet
          </div>
        )}
      </div>
      
      {/* Divider */}
      <div className="my-3 border-t border-border"></div>
      
      {/* Price summary */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>
        
        {savings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">You Save</span>
            <span className="text-green-500 font-medium">₹{savings.toLocaleString()}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Shipping</span>
          <span className="font-medium">{shippingEstimate === 0 ? 'Free' : `₹${shippingEstimate.toLocaleString()}`}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Assembly Fee</span>
          <span className="font-medium">₹{assemblyFee.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Divider */}
      <div className="my-3 border-t border-border"></div>
      
      {/* Total */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>₹{total.toLocaleString()}</span>
      </div>
      
      {/* Free shipping threshold */}
      {subtotal < 1000 && (
        <div className="mt-3 text-xs text-gray-400">
          Add ${(1000 - subtotal).toFixed(2)} more to qualify for free shipping
        </div>
      )}
    </div>
  );
};

// Helper function to format component type names
const formatComponentType = (type: keyof PcBuild): string => {
  const typeMap: Record<keyof PcBuild, string> = {
    cpu: 'Processor',
    motherboard: 'Motherboard',
    memory: 'Memory',
    storage: 'Storage',
    gpu: 'Graphics Card',
    case: 'Case',
    powerSupply: 'Power Supply',
    cooling: 'CPU Cooling'
  };
  
  return typeMap[type] || type;
};

export default PriceCalculator; 