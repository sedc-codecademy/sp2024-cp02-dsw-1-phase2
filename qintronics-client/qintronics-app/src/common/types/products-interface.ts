export interface BaseProduct {
  specifications: any;
  id: string;
  category: string;
  subCategory?: string;
  brand: string;
  name: string;
  description: string;
  img: string;
  price: number;
  warranty: string;
  availability: number;
  discount: number;
}

export interface Laptop extends BaseProduct {
  specifications: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    display: string;
    camera: string;
    battery: string;
    os: string;
  };
}

export interface TV extends BaseProduct {
  specifications: {
    displaySize: string;
    resolution: string;
    aspectRatio: string;
    refreshRate: string;
    inputs: string;
    features: string;
  };
}

export interface Keyboard extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    cableLength: string;
    interface: string;
    keys: number;
    type: string;
    systemRequirements: string;
  };
}

export interface Headphone extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    cableLength: string;
    interface: string;
    frequencyResponse: string;
    type: string;
    batteryLife: string;
    systemRequirements: string;
  };
}

export interface ActionCamera extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    cameraResolution: string;
    videoResolution: string;
    batteryLife: string;
    interface: string;
    waterproofDepth: string;
  };
}

export interface Camera extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    sensorType: string;
    resolution: string;
    videoResolution: string;
    screenSize: string;
    batteryLife: string;
    interface: string;
    systemRequirements: string;
  };
}

export interface WebCamera extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    interface: string;
    resolution: string;
    frameRate: string;
    fieldOfView: string;
    focusType: string;
    microphone: string;
    systemRequirements: string;
  };
}

export interface Controller extends BaseProduct {
  specifications: {
    platform: string;
    connection_type: string;
    battery_life: string;
    features: string;
    color: string;
    weight: string;
    dimensions: string;
  };
}

export interface Game extends BaseProduct {
  specifications: {
    platform: string;
    genre: string;
    release_date: string;
    developer: string;
    publisher: string;
    mode: string;
    rating: string;
  };
}

export interface GamingChair extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    material: string;
    maxLoad: string;
    features: string;
  };
}

export interface Smartwatch extends BaseProduct {
  specifications: {
    battery_life: string;
    water_resistance: string;
    connectivity: string;
  };
}

export interface Drone extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    cameraResolution: string;
    videoResolution: string;
    flightTime: string;
    range: string;
    interface: string;
  };
}

export interface RAM extends BaseProduct {
  specifications: {
    capacity: string;
    type: string;
    speed: string;
    voltage: string;
    formFactor: string;
  };
}

export interface GraphicCard extends BaseProduct {
  specifications: {
    base_clock_mhz: string;
    boost_clock_mhz: string;
    memory_size_gb: string;
    memory_type: string;
    recommended_psu_watts: string;
  };
}

export interface Processor extends BaseProduct {
  specifications: {
    base_clock_speed: string;
    max_boost_clock_speed: string;
    core_count: string;
    thread_count: string;
    cache: string;
    socket: string;
  };
}

export interface Mouse extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    cableLength: string;
    interface: string;
    dpi: string;
    type: string;
    systemRequirements: string;
  };
}

export interface MousePad extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    material: string;
    features: string;
  };
}

export interface Microphone extends BaseProduct {
  specifications: {
    dimensions: string;
    weight: string;
    cableLength: string;
    interface: string;
    frequencyResponse: string;
    type: string;
    systemRequirements: string;
  };
}

export interface GiftCard extends BaseProduct {
  specifications: never; // Gift cards don't have specifications
  message: string;
}

export type Product =
  | Laptop
  | TV
  | Keyboard
  | Headphone
  | ActionCamera
  | Camera
  | WebCamera
  | Controller
  | Game
  | GamingChair
  | Smartwatch
  | Drone
  | RAM
  | GraphicCard
  | Processor
  | Mouse
  | MousePad
  | Microphone
  | GiftCard;
