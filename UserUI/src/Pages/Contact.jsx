import React, { useState } from 'react';

// --- 1. DATA STRUCTURE ---

const MODEL_DATA = {
  'iPhone Air': {
    name: 'iPhone Air',
    colorOptions: [
      { name: 'Sky Blue', hex: '#6AA8F4' }, // Light Blue
      { name: 'Black', hex: '#333333' }
    ],
    // Placeholder image URL
    imageUrl: 'https://via.placeholder.com/250x350/6AA8F4/FFFFFF?text=iPhone+Air'
  },
  'iPhone 17': {
    name: 'iPhone 17',
    colorOptions: [
      { name: 'Lavender', hex: '#C3A0D6' }, // Light Purple
      { name: 'Green', hex: '#A8D6A0' },    // Light Green
      { name: 'Purple', hex: '#8C46C3' },    // Dark Purple
      { name: 'Black', hex: '#333333' }
    ],
    imageUrl: 'https://via.placeholder.com/250x350/A8D6A0/FFFFFF?text=iPhone+17'
  },
  'iPhone 17 Pro Max': {
    name: 'iPhone 17 Pro Max',
    colorOptions: [
      { name: 'Copper Orange', hex: '#D68B46' }, // Orange/Copper
      { name: 'Silver', hex: '#CCCCCC' },      // Silver
      { name: 'White', hex: '#FFFFFF' }
    ],
    imageUrl: 'https://via.placeholder.com/250x350/D68B46/FFFFFF?text=iPhone+17+Pro+Max'
  }
};

const ALL_MODELS = Object.keys(MODEL_DATA);

// Utility function to get the initial state
const getInitialState = () => ({
  slot1: {
    model: 'iPhone Air',
    color: 'Sky Blue',
  },
  slot2: {
    model: 'iPhone 17',
    color: 'Lavender',
  },
  slot3: {
    model: 'iPhone 17 Pro Max',
    color: 'Copper Orange',
  },
});

// --- 2. REACT COMPONENT ---

const Contact = () => {
  // Single state object to manage all selections
  const [selectedModels, setSelectedModels] = useState(getInitialState);

  // General handler to update a model or color in a specific slot
  const handleSelectionChange = (slotKey, type, value) => {
    setSelectedModels(prevModels => {
      let newState = { ...prevModels };
      newState[slotKey] = { ...prevModels[slotKey], [type]: value };

      // Reset color if a new model is selected
      if (type === 'model' && MODEL_DATA[value]) {
        // Find the default color for the newly selected model
        const defaultColor = MODEL_DATA[value].colorOptions[0].name;
        newState[slotKey].color = defaultColor;
      }

      return newState;
    });
  };

  // --- RENDER FUNCTIONS ---

  const renderComparisonColumn = (slotKey) => {
    const selectedModelName = selectedModels[slotKey].model;
    const selectedColorName = selectedModels[slotKey].color;
    const modelInfo = MODEL_DATA[selectedModelName];

    // Find the current image URL and the selected color's hex code
    const baseImageUrl = modelInfo.imageUrl;
    const selectedColorHex = modelInfo.colorOptions.find(c => c.name === selectedColorName)?.hex || '#000000';
    
    // NOTE: For a real app, you would dynamically change the image based on selectedColorName
    // We are using a simple placeholder URL for this example.

    return (
      <div key={slotKey} className="flex flex-col items-center p-4 border-r border-gray-200 last:border-r-0 w-full">
        
        {/* Model Selection Dropdown */}
        <select
          value={selectedModelName}
          onChange={(e) => handleSelectionChange(slotKey, 'model', e.target.value)}
          className="w-full p-2 mb-6 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          {ALL_MODELS.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        {/* Image Display */}
        <div className="h-80 w-64 flex items-center justify-center mb-4 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <img
            // Using the base image URL as a simple visual placeholder
            src={baseImageUrl} 
            alt={`${selectedModelName} in ${selectedColorName}`}
            className="object-contain h-full w-full p-4"
          />
        </div>

        {/* Color Options */}
        <div className="flex space-x-3 mb-2">
          {modelInfo.colorOptions.map((color) => (
            <div
              key={color.name}
              className={`p-1 rounded-full cursor-pointer transition duration-150 ease-in-out ${selectedColorName === color.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              onClick={() => handleSelectionChange(slotKey, 'color', color.name)}
              title={color.name}
            >
              <div
                className="w-5 h-5 rounded-full border border-gray-300 shadow-inner"
                style={{ backgroundColor: color.hex }}
              />
            </div>
          ))}
        </div>
        
        {/* Selected Color Name */}
        <p className="text-sm font-medium text-gray-700 mb-2">{selectedColorName}</p>
        
        {/* Status Tag */}
        <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-md">
          New
        </span>
        
        {/* Placeholder for Price/CTA (as seen in the original image) */}
        <div className="mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-150 shadow-lg">
                Buy Now
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 font-sans">
      
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Compare iPhone models</h1>
        <p className="text-lg text-gray-600 mb-1">
          Get help choosing. <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Chat with a Specialist</span>
        </p>
        <p className="text-md text-gray-600">
          Watch a guided tour of <span className="text-blue-600 font-semibold cursor-pointer hover:underline">iPhone 17, iPhone Air and iPhone 17 Pro</span>
        </p>
      </header>

      {/* Comparison Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Iterate over the slots in the state to render comparison columns */}
          {Object.keys(selectedModels).map(renderComparisonColumn)}
        </div>
      </div>
      
      {/* Placeholder for Specs Comparison Table (Optional) */}
      <section className="mt-16 max-w-7xl mx-auto p-4 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Key Features Comparison</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner text-gray-600">
              <p className="text-center italic">
                  *A full specifications table would be built here, using the `selectedModels` state to display specs dynamically.*
              </p>
              <ul className="grid grid-cols-4 gap-4 mt-4 text-sm font-medium">
                  <li className="font-bold text-left">Display:</li>
                  <li className="text-center">6.1" LCD</li>
                  <li className="text-center">6.7" Super Retina</li>
                  <li className="text-center">6.9" ProMotion</li>
              </ul>
          </div>
      </section>

    </div>
  );
};

export default Contact;