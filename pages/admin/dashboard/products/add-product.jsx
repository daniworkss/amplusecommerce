'use client'
import { useState } from "react";
import { Upload, X, Plus, Check, Minus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import imageCompression from "browser-image-compression";
import Layout from "@/components/admin/layout";

export default function AddOutfit() {
  const [name, setName] = useState("");
  const [specifications, setSpecifications] = useState([""]);
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [sizeInventory, setSizeInventory] = useState({});
  const [colorInventory, setColorInventory] = useState({});
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const colors = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Navy', value: 'navy', hex: '#1e3a8a' },
    { name: 'Grey', value: 'grey', hex: '#6b7280' },
    { name: 'Cream', value: 'cream', hex: '#f5f5dc' },
    { name: 'Brown', value: 'brown', hex: '#8b4513' },
    { name: 'Red', value: 'red', hex: '#dc2626' },
    { name: 'Blue', value: 'blue', hex: '#2563eb' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  const handleColorToggle = (colorValue) => {
    setSelectedColors(prev => {
      const newColors = prev.includes(colorValue)
        ? prev.filter(c => c !== colorValue)
        : [...prev, colorValue];

      // Update color inventory when colors change
      setColorInventory(prevColorInventory => {
        const newColorInventory = { ...prevColorInventory };
        
        if (!prev.includes(colorValue)) {
          // Adding a color
          if (selectedSizes.length > 0) {
            newColorInventory[colorValue] = {};
            selectedSizes.forEach(size => {
              newColorInventory[colorValue][size] = 0;
            });
          } else {
            newColorInventory[colorValue] = 0;
          }
        } else {
          // Removing a color
          delete newColorInventory[colorValue];
        }
        
        return newColorInventory;
      });

      return newColors;
    });
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => {
      const newSizes = prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size];

      setSizeInventory(prevInventory => {
        const newInventory = { ...prevInventory };
        if (!prev.includes(size)) {
          newInventory[size] = 0;
        } else {
          delete newInventory[size];
        }
        return newInventory;
      });

      // Update color inventory when sizes change and multiple colors selected
      if (selectedColors.length > 1) {
        setColorInventory(prevColorInventory => {
          const newColorInventory = { ...prevColorInventory };
          
          selectedColors.forEach(color => {
            if (!newColorInventory[color]) {
              newColorInventory[color] = {};
            }
            
            if (!prev.includes(size)) {
              // Adding a size
              newColorInventory[color][size] = 0;
            } else {
              // Removing a size
              delete newColorInventory[color][size];
            }
          });
          
          return newColorInventory;
        });
      }

      return newSizes;
    });
  };

  const handleSizeInventoryChange = (size, value) => {
    setSizeInventory(prev => ({
      ...prev,
      [size]: parseInt(value) || 0
    }));
  };

  const handleColorInventoryChange = (color, size, value) => {
    setColorInventory(prev => ({
      ...prev,
      [color]: {
        ...prev[color],
        [size]: parseInt(value) || 0
      }
    }));
  };

  const handleSimpleColorInventoryChange = (color, value) => {
    setColorInventory(prev => ({
      ...prev,
      [color]: parseInt(value) || 0
    }));
  };

  const getTotalInventory = () => {
    if (selectedColors.length > 1) {
      // Calculate total from color inventory
      let total = 0;
      Object.values(colorInventory).forEach(colorData => {
        if (typeof colorData === 'object') {
          total += Object.values(colorData).reduce((sum, qty) => sum + (qty || 0), 0);
        } else {
          total += colorData || 0;
        }
      });
      return total;
    } else {
      // Use existing logic for single color or no colors
      return Object.values(sizeInventory).reduce((total, qty) => total + (qty || 0), 0);
    }
  };

  const handleImageChange = async (e) => {
    if (!e.target.files) return;

    const fileArray = Array.from(e.target.files).slice(0, 6);

    const options = {
      maxSizeMB: 1, // target ≤ 1MB
      maxWidthOrHeight: 1920, // resize if bigger
      useWebWorker: true
    };

    try {
      const compressedImages = await Promise.all(
        fileArray.map(async (file) => {
          console.log("Original:", file.name, (file.size / 1024 / 1024).toFixed(2), "MB");
          const compressedFile = await imageCompression(file, options);
          console.log("Compressed:", compressedFile.name, (compressedFile.size / 1024 / 1024).toFixed(2), "MB");
          return compressedFile;
        })
      );
      setImages(compressedImages);
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Error compressing images");
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    setSpecifications([...specifications, ""]);
  };

  const removeSpecification = (index) => {
    if (specifications.length > 1) {
      setSpecifications(specifications.filter((_, i) => i !== index));
    }
  };

  const updateSpecification = (index, value) => {
    const newSpecs = [...specifications];
    newSpecs[index] = value;
    setSpecifications(newSpecs);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("name", name);
    formData.append("category", "outfits");
    formData.append("description", JSON.stringify(specifications.filter(spec => spec.trim() !== "")));
    formData.append("price", price);
    formData.append("prevprice", compareAtPrice);
    formData.append("stock", getTotalInventory().toString());
    
    // Send appropriate inventory data based on color selection
    if (selectedColors.length > 1) {
      formData.append("colorInventory", JSON.stringify(colorInventory));
    } else {
      formData.append("sizeInventory", JSON.stringify(sizeInventory));
    }
    
    formData.append("colors", JSON.stringify(selectedColors));
    formData.append("sizes", JSON.stringify(selectedSizes));

    try {
      const response = await fetch('/api/upload-product', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        toast.error('Something went wrong. Please try again.');
      } else {
        toast.success('Outfit added successfully!');
        setName("");
        setSpecifications([""]);
        setPrice("");
        setCompareAtPrice("");
        setInventory("");
        setSizeInventory({});
        setColorInventory({});
        setImages([]);
        setSelectedColors([]);
        setSelectedSizes([]);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <>
    <ToastContainer/>
   <Layout>
   <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Add Outfit</h1>
          <p className="text-gray-600">Create a new Outfit listing for your store</p>
        </div>

        <div className="space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Images</h2>
            
            <div className="space-y-4">
              {images.length === 0 ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              ) : (
                <div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Add more images
                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Enter dress title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Specifications
                </label>
                <div className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-2 text-gray-500">•</span>
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => updateSpecification(index, e.target.value)}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          placeholder="Add a specification point..."
                        />
                      </div>
                      {specifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpecification(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add specification
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compare at price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Variants</h2>
            
            <div className="space-y-6">
              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Colors
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleColorToggle(color.value)}
                      className={`relative p-3 border rounded-lg text-left hover:border-gray-400 transition-colors ${
                        selectedColors.includes(color.value)
                          ? 'border-gray-500 bg-gray-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{ 
                            backgroundColor: color.hex,
                            border: color.value === 'white' ? '1px solid #d1d5db' : undefined
                          }}
                        />
                        <span className="text-sm">{color.name}</span>
                      </div>
                      {selectedColors.includes(color.value) && (
                        <Check className="absolute top-2 right-2 w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                        selectedSizes.includes(size)
                          ? 'border-gray-500 bg-black text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Inventory</h2>
            
            <div className="space-y-4">
              {selectedColors.length > 1 ? (
                // Color-based inventory when multiple colors selected
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantity by color {selectedSizes.length > 0 && "and size"}
                  </label>
                  <div className="space-y-6">
                    {selectedColors.map((colorValue) => {
                      const colorObj = colors.find(c => c.value === colorValue);
                      return (
                        <div key={colorValue} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <div
                              className="w-4 h-4 rounded border border-gray-300"
                              style={{ 
                                backgroundColor: colorObj?.hex,
                                border: colorValue === 'white' ? '1px solid #d1d5db' : undefined
                              }}
                            />
                            <span className="font-medium text-gray-900">{colorObj?.name}</span>
                          </div>
                          
                          {selectedSizes.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                              {selectedSizes.map((size) => (
                                <div key={size} className="flex items-center space-x-3">
                                  <div className="flex items-center justify-center w-10 h-8 bg-gray-100 border border-gray-300 rounded text-sm font-medium text-gray-700">
                                    {size}
                                  </div>
                                  <div className="flex-1">
                                    <input
                                      type="number"
                                      value={colorInventory[colorValue]?.[size] || ''}
                                      onChange={(e) => handleColorInventoryChange(colorValue, size, e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                      placeholder="0"
                                      min="0"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="max-w-xs">
                              <input
                                type="number"
                                value={colorInventory[colorValue] || ''}
                                onChange={(e) => handleSimpleColorInventoryChange(colorValue, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                placeholder="0"
                                min="0"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Total inventory: </span>
                      {getTotalInventory()} units
                    </p>
                  </div>
                </div>
              ) : selectedSizes.length === 0 ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={inventory}
                    onChange={(e) => setInventory(e.target.value)}
                    className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-sm text-gray-500 mt-1">Select sizes above to set inventory per size</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantity by size
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSizes.map((size) => (
                      <div key={size} className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-8 bg-gray-100 border border-gray-300 rounded text-sm font-medium text-gray-700">
                          {size}
                        </div>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={sizeInventory[size] || ''}
                            onChange={(e) => handleSizeInventoryChange(size, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Total inventory: </span>
                      {getTotalInventory()} units
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
         
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Outfit</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
   </Layout>
   </>
  );
}