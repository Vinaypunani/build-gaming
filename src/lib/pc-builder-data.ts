import { ComponentType, SelectedComponent } from "@/types/pc-builder";

// Mock data for PC components
const componentsData: Record<ComponentType, SelectedComponent[]> = {
  cpu: [
    {
      id: "cpu-1",
      name: "Ryzen 9 7950X",
      brand: "AMD",
      image: "/images/components/cpu-amd.webp",
      price: 699.99,
      discount: 50,
      rating: 5,
      reviews: 128,
      stock: 15,
      specs: {
        cores: "16 Cores",
        threads: "32 Threads",
        baseClock: "4.5 GHz",
        boostClock: "5.7 GHz",
        tdp: "170W",
        socket: "AM5"
      }
    },
    {
      id: "cpu-2",
      name: "Core i9-13900K",
      brand: "Intel",
      image: "/images/components/cpu-intel.webp",
      price: 589.99,
      rating: 4.5,
      reviews: 87,
      stock: 8,
      specs: {
        cores: "24 Cores (8P+16E)",
        threads: "32 Threads",
        baseClock: "3.0 GHz",
        boostClock: "5.8 GHz",
        tdp: "125W",
        socket: "LGA 1700"
      }
    },
    {
      id: "cpu-3",
      name: "Ryzen 7 7800X3D",
      brand: "AMD",
      image: "/images/components/cpu-amd-2.webp",
      price: 449.99,
      discount: 30,
      rating: 5,
      reviews: 64,
      stock: 20,
      specs: {
        cores: "8 Cores",
        threads: "16 Threads",
        baseClock: "4.2 GHz",
        boostClock: "5.0 GHz",
        tdp: "120W",
        socket: "AM5"
      }
    },
    {
      id: "cpu-4",
      name: "Core i7-13700K",
      brand: "Intel",
      image: "/images/components/cpu-intel-2.webp",
      price: 419.99,
      rating: 4.5,
      reviews: 53,
      stock: 12,
      specs: {
        cores: "16 Cores (8P+8E)",
        threads: "24 Threads",
        baseClock: "3.4 GHz",
        boostClock: "5.4 GHz",
        tdp: "125W",
        socket: "LGA 1700"
      }
    },
    {
      id: "cpu-5",
      name: "Ryzen 5 7600X",
      brand: "AMD",
      image: "/images/components/cpu-amd-3.webp",
      price: 299.99,
      rating: 4.5,
      reviews: 42,
      stock: 25,
      specs: {
        cores: "6 Cores",
        threads: "12 Threads",
        baseClock: "4.7 GHz",
        boostClock: "5.3 GHz",
        tdp: "105W",
        socket: "AM5"
      }
    }
  ],
  motherboard: [
    {
      id: "mb-1",
      name: "ROG Crosshair X670E Hero",
      brand: "ASUS",
      image: "/images/components/mb-asus.webp",
      price: 699.99,
      rating: 4.5,
      reviews: 34,
      stock: 7,
      specs: {
        chipset: "AMD X670E",
        formFactor: "ATX",
        memorySlots: "4x DIMM, Max 128GB",
        socket: "AM5",
        pciSlots: "2x PCIe 5.0 x16",
        m2Slots: "4x M.2 NVMe PCIe 5.0"
      }
    },
    {
      id: "mb-2",
      name: "MAG B650 TOMAHAWK WIFI",
      brand: "MSI",
      image: "/images/components/mb-msi.webp",
      price: 259.99,
      discount: 20,
      rating: 4,
      reviews: 28,
      stock: 15,
      specs: {
        chipset: "AMD B650",
        formFactor: "ATX",
        memorySlots: "4x DIMM, Max 128GB",
        socket: "AM5",
        pciSlots: "1x PCIe 5.0 x16",
        m2Slots: "3x M.2 NVMe PCIe 4.0"
      }
    },
    {
      id: "mb-3",
      name: "Z790 AORUS MASTER",
      brand: "Gigabyte",
      image: "/images/components/mb-gigabyte.webp",
      price: 499.99,
      rating: 4.5,
      reviews: 19,
      stock: 9,
      specs: {
        chipset: "Intel Z790",
        formFactor: "ATX",
        memorySlots: "4x DIMM, Max 128GB",
        socket: "LGA 1700",
        pciSlots: "1x PCIe 5.0 x16",
        m2Slots: "4x M.2 NVMe PCIe 4.0"
      }
    },
    {
      id: "mb-4",
      name: "MPG Z790 EDGE WIFI",
      brand: "MSI",
      image: "/images/components/mb-msi-2.webp",
      price: 349.99,
      discount: 30,
      rating: 4,
      reviews: 23,
      stock: 11,
      specs: {
        chipset: "Intel Z790",
        formFactor: "ATX",
        memorySlots: "4x DIMM, Max 128GB",
        socket: "LGA 1700",
        pciSlots: "1x PCIe 5.0 x16",
        m2Slots: "4x M.2 NVMe PCIe 4.0"
      }
    }
  ],
  memory: [
    {
      id: "ram-1",
      name: "Trident Z5 RGB DDR5-6000 32GB",
      brand: "G.SKILL",
      image: "/images/components/ram-gskill.webp",
      price: 179.99,
      rating: 5,
      reviews: 42,
      stock: 20,
      specs: {
        type: "DDR5",
        capacity: "32GB (2x16GB)",
        speed: "6000MHz",
        timing: "CL36",
        voltage: "1.35V",
        rgb: "Yes"
      }
    },
    {
      id: "ram-2",
      name: "Vengeance RGB DDR5-5600 32GB",
      brand: "Corsair",
      image: "/images/components/ram-corsair.webp",
      price: 159.99,
      rating: 4.5,
      reviews: 38,
      stock: 25,
      specs: {
        type: "DDR5",
        capacity: "32GB (2x16GB)",
        speed: "5600MHz",
        timing: "CL36",
        voltage: "1.25V",
        rgb: "Yes"
      }
    },
    {
      id: "ram-3",
      name: "Ripjaws S5 DDR5-5200 64GB",
      brand: "G.SKILL",
      image: "/images/components/ram-gskill-2.webp",
      price: 249.99,
      discount: 30,
      rating: 4.5,
      reviews: 19,
      stock: 12,
      specs: {
        type: "DDR5",
        capacity: "64GB (2x32GB)",
        speed: "5200MHz",
        timing: "CL42",
        voltage: "1.25V",
        rgb: "No"
      }
    }
  ],
  storage: [
    {
      id: "storage-1",
      name: "980 PRO PCIe 4.0 NVMe SSD 2TB",
      brand: "Samsung",
      image: "/images/components/ssd-samsung.webp",
      price: 199.99,
      discount: 40,
      rating: 5,
      reviews: 76,
      stock: 30,
      specs: {
        type: "NVMe SSD",
        capacity: "2TB",
        interface: "PCIe 4.0 x4",
        form: "M.2 2280",
        readSpeed: "7,000 MB/s",
        writeSpeed: "5,100 MB/s"
      }
    },
    {
      id: "storage-2",
      name: "FireCuda 530 PCIe 4.0 NVMe SSD 4TB",
      brand: "Seagate",
      image: "/images/components/ssd-seagate.webp",
      price: 429.99,
      rating: 4.5,
      reviews: 34,
      stock: 15,
      specs: {
        type: "NVMe SSD",
        capacity: "4TB",
        interface: "PCIe 4.0 x4",
        form: "M.2 2280",
        readSpeed: "7,300 MB/s",
        writeSpeed: "6,900 MB/s"
      }
    },
    {
      id: "storage-3",
      name: "WD_BLACK SN850X NVMe SSD 2TB",
      brand: "Western Digital",
      image: "/images/components/ssd-wd.webp",
      price: 189.99,
      rating: 4.5,
      reviews: 48,
      stock: 22,
      specs: {
        type: "NVMe SSD",
        capacity: "2TB",
        interface: "PCIe 4.0 x4",
        form: "M.2 2280",
        readSpeed: "7,300 MB/s",
        writeSpeed: "6,600 MB/s"
      }
    }
  ],
  gpu: [
    {
      id: "gpu-1",
      name: "GeForce RTX 4090 Gaming X Trio 24G",
      brand: "MSI",
      image: "/images/components/gpu-msi.webp",
      price: 1999.99,
      rating: 5,
      reviews: 53,
      stock: 5,
      specs: {
        gpu: "NVIDIA GeForce RTX 4090",
        memory: "24GB GDDR6X",
        coreClock: "2.52 GHz (Boost)",
        interface: "PCIe 4.0 x16",
        length: "337mm",
        power: "450W"
      }
    },
    {
      id: "gpu-2",
      name: "Radeon RX 7900 XTX Gaming OC 24G",
      brand: "Gigabyte",
      image: "/images/components/gpu-gigabyte.webp",
      price: 1099.99,
      discount: 100,
      rating: 4.5,
      reviews: 37,
      stock: 8,
      specs: {
        gpu: "AMD Radeon RX 7900 XTX",
        memory: "24GB GDDR6",
        coreClock: "2.5 GHz (Boost)",
        interface: "PCIe 4.0 x16",
        length: "331mm",
        power: "355W"
      }
    },
    {
      id: "gpu-3",
      name: "GeForce RTX 4080 SUPER TUF Gaming OC",
      brand: "ASUS",
      image: "/images/components/gpu-asus.webp",
      price: 1199.99,
      rating: 4.5,
      reviews: 28,
      stock: 10,
      specs: {
        gpu: "NVIDIA GeForce RTX 4080 SUPER",
        memory: "16GB GDDR6X",
        coreClock: "2.55 GHz (Boost)",
        interface: "PCIe 4.0 x16",
        length: "348mm",
        power: "320W"
      }
    }
  ],
  case: [
    {
      id: "case-1",
      name: "H7 Flow",
      brand: "NZXT",
      image: "/images/components/case-nzxt.webp",
      price: 129.99,
      rating: 4.5,
      reviews: 45,
      stock: 20,
      specs: {
        type: "Mid Tower",
        motherboardSupport: "Mini-ITX, Micro-ATX, ATX, E-ATX",
        dimensions: "230mm x 505mm x 480mm",
        gpuClearance: "400mm",
        fans: "3x 120mm included",
        material: "Steel, Tempered Glass"
      }
    },
    {
      id: "case-2",
      name: "5000D AIRFLOW",
      brand: "Corsair",
      image: "/images/components/case-corsair.webp",
      price: 174.99,
      discount: 25,
      rating: 5,
      reviews: 62,
      stock: 15,
      specs: {
        type: "Mid Tower",
        motherboardSupport: "Mini-ITX, Micro-ATX, ATX, E-ATX",
        dimensions: "520mm x 245mm x 520mm",
        gpuClearance: "420mm",
        fans: "3x 120mm included",
        material: "Steel, Tempered Glass"
      }
    },
    {
      id: "case-3",
      name: "O11 Dynamic EVO",
      brand: "Lian Li",
      image: "/images/components/case-lianli.webp",
      price: 159.99,
      rating: 5,
      reviews: 57,
      stock: 18,
      specs: {
        type: "Mid Tower",
        motherboardSupport: "Mini-ITX, Micro-ATX, ATX, E-ATX",
        dimensions: "464mm x 285mm x 459mm",
        gpuClearance: "422mm",
        fans: "None included",
        material: "Aluminum, Tempered Glass"
      }
    }
  ],
  powerSupply: [
    {
      id: "psu-1",
      name: "ROG Thor 1000W Platinum II",
      brand: "ASUS",
      image: "/images/components/psu-asus.webp",
      price: 299.99,
      rating: 4.5,
      reviews: 28,
      stock: 15,
      specs: {
        wattage: "1000W",
        efficiency: "80+ Platinum",
        modular: "Fully Modular",
        fanSize: "135mm",
        warranty: "10 Years",
        features: "OLED Power Display"
      }
    },
    {
      id: "psu-2",
      name: "RM1000x 80+ Gold",
      brand: "Corsair",
      image: "/images/components/psu-corsair.webp",
      price: 189.99,
      discount: 20,
      rating: 5,
      reviews: 47,
      stock: 25,
      specs: {
        wattage: "1000W",
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        fanSize: "135mm",
        warranty: "10 Years",
        features: "Zero RPM Mode"
      }
    },
    {
      id: "psu-3",
      name: "Supernova 850 G7 80+ Gold",
      brand: "EVGA",
      image: "/images/components/psu-evga.webp",
      price: 149.99,
      rating: 4.5,
      reviews: 32,
      stock: 20,
      specs: {
        wattage: "850W",
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        fanSize: "135mm",
        warranty: "10 Years",
        features: "ECO Mode"
      }
    }
  ],
  cooling: [
    {
      id: "cooling-1",
      name: "Kraken Z73 RGB 360mm AIO",
      brand: "NZXT",
      image: "/images/components/cooling-nzxt.webp",
      price: 299.99,
      rating: 5,
      reviews: 38,
      stock: 12,
      specs: {
        type: "Liquid Cooling",
        radiatorSize: "360mm",
        fans: "3x 120mm RGB Fans",
        compatibility: "Intel & AMD",
        rgb: "Yes",
        features: "LCD Display"
      }
    },
    {
      id: "cooling-2",
      name: "iCUE H150i ELITE CAPELLIX XT 360mm AIO",
      brand: "Corsair",
      image: "/images/components/cooling-corsair.webp",
      price: 219.99,
      discount: 30,
      rating: 4.5,
      reviews: 42,
      stock: 15,
      specs: {
        type: "Liquid Cooling",
        radiatorSize: "360mm",
        fans: "3x 120mm RGB Fans",
        compatibility: "Intel & AMD",
        rgb: "Yes",
        features: "Commander CORE XT included"
      }
    },
    {
      id: "cooling-3",
      name: "NH-D15 chromax.black",
      brand: "Noctua",
      image: "/images/components/cooling-noctua.webp",
      price: 109.99,
      rating: 5,
      reviews: 65,
      stock: 20,
      specs: {
        type: "Air Cooling",
        dimensions: "165mm x 150mm x 161mm",
        fans: "2x 140mm Fans",
        compatibility: "Intel & AMD",
        rgb: "No",
        features: "Dual Tower Design"
      }
    }
  ]
};

// Function to get components data by type
export const getComponentsData = (type: ComponentType): SelectedComponent[] => {
  return componentsData[type] || [];
};

export { componentsData };  