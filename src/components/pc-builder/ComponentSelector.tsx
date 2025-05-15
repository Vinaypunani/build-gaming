"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Cpu, Check, Star, ArrowUpDown } from 'lucide-react';
import { ComponentType, SelectedComponent } from '@/types/pc-builder';

interface ComponentSelectorProps {
  type: ComponentType;
  onSelect: (component: SelectedComponent) => void;
  currentSelection: SelectedComponent | null;
}

const COMPONENT_TYPE_TO_CATEGORY: Record<ComponentType, string> = {
  cpu: 'CPU',
  motherboard: 'Motherboard',
  memory: 'RAM',
  storage: 'Storage',
  gpu: 'GPU',
  case: 'Case',
  powerSupply: 'Power Supply',
  cooling: 'Cooling',
};

const ComponentSelector = ({ type, onSelect, currentSelection }: ComponentSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'popularity'>('popularity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [components, setComponents] = useState<SelectedComponent[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        // Filter products by category name
        const filtered = data.filter((product: any) => product.category?.name === COMPONENT_TYPE_TO_CATEGORY[type]);
        // Map to SelectedComponent shape
        setComponents(filtered.map((product: any) => ({
          id: product.id,
          name: product.name,
          brand: product.brand || product.category?.name || '',
          image: product.image,
          price: product.price,
          discount: product.discount || 0,
          rating: product.rating || 4.5,
          reviews: product.reviews || 0,
          stock: product.stock,
          specs: product.specs || {},
        })));
      } catch (e) {
        setComponents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComponents();
  }, [type]);
  
  // Filter components based on search
  const filteredComponents = components.filter(component => 
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort components
  const sortedComponents = [...filteredComponents].sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else { // popularity
      return sortOrder === 'asc' 
        ? a.rating - b.rating
        : b.rating - a.rating;
    }
  });
  
  const toggleSort = (newSortBy: 'price' | 'name' | 'popularity') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };
  
  return (
    <div className="bg-background border-t border-border p-4">
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 py-2 pr-4 block w-full rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder={`Search ${type}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            className={`px-3 py-2 text-sm rounded-md flex items-center gap-1 border ${
              sortBy === 'price' ? 'border-primary text-primary' : 'border-border text-gray-400'
            }`}
            onClick={() => toggleSort('price')}
          >
            Price
            <ArrowUpDown size={14} className={sortBy === 'price' ? 'text-primary' : 'text-gray-400'} />
          </button>
          
          <button 
            className={`px-3 py-2 text-sm rounded-md flex items-center gap-1 border ${
              sortBy === 'name' ? 'border-primary text-primary' : 'border-border text-gray-400'
            }`}
            onClick={() => toggleSort('name')}
          >
            Name
            <ArrowUpDown size={14} className={sortBy === 'name' ? 'text-primary' : 'text-gray-400'} />
          </button>
          
          <button 
            className={`px-3 py-2 text-sm rounded-md flex items-center gap-1 border ${
              sortBy === 'popularity' ? 'border-primary text-primary' : 'border-border text-gray-400'
            }`}
            onClick={() => toggleSort('popularity')}
          >
            Popular
            <ArrowUpDown size={14} className={sortBy === 'popularity' ? 'text-primary' : 'text-gray-400'} />
          </button>
        </div>
      </div>
      
      {/* Components list */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[450px] pr-2 -mr-2 space-y-2">
          {sortedComponents.length > 0 ? (
            sortedComponents.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onSelect={onSelect}
                isSelected={currentSelection?.id === component.id}
              />
            ))
          ) : (
            <div className="text-center py-6 text-gray-400">
              <Cpu size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No {type}s found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface ComponentCardProps {
  component: SelectedComponent;
  onSelect: (component: SelectedComponent) => void;
  isSelected: boolean;
}

const ComponentCard = ({ component, onSelect, isSelected }: ComponentCardProps) => {
  return (
    <div 
      className={`p-4 rounded-md border ${
        isSelected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:bg-card/70'
      } cursor-pointer transition-all`}
      onClick={() => onSelect(component)}
    >
      <div className="flex">
        <div className="shrink-0 w-20 h-20 relative bg-background rounded-md overflow-hidden border border-border">
          <Image
            src={component.image || '/images/placeholder-component.webp'}
            alt={component.name}
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        </div>
        
        <div className="ml-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400">{component.brand}</p>
              <h4 className="font-medium text-sm sm:text-base mb-1">{component.name}</h4>
            </div>
            
            {isSelected && (
              <span className="flex items-center gap-1 text-xs text-primary">
                <Check size={16} /> Selected
              </span>
            )}
          </div>
          
          <div className="flex items-center mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={`${
                  star <= component.rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-400'
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">({component.reviews})</span>
          </div>
          
          <div className="flex justify-between items-end mt-1">
            <div>
              {component.discount ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold">₹{component.price.toLocaleString('en-IN')}</span>
                  <span className="text-gray-400 text-xs line-through">₹{(component.price + component.discount).toLocaleString('en-IN')}</span>
                  <span className="text-green-500 text-xs">Save ₹{component.discount.toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <span className="font-bold">₹{component.price.toLocaleString('en-IN')}</span>
              )}
            </div>
            
            <div className="text-xs text-green-500">
              {component.stock > 10 ? 'In Stock' : component.stock > 0 ? `Only ${component.stock} left` : 'Out of Stock'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentSelector; 