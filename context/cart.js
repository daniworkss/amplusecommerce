import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  count: 0,
  userData: {},
  clientSecret: '',
  isInitialized: false,
  orderId: [],
  receiptTotal: 0,

  initialize: () => {
    const savedCart = localStorage.getItem('cart');
    const savedTotal = localStorage.getItem('total');
    const savedCount = localStorage.getItem('count');

    set({
      cart: savedCart ? JSON.parse(savedCart) : [],
      total: savedTotal ? parseFloat(savedTotal) : 0,
      count: savedCount ? parseInt(savedCount) : 0,
      isInitialized: true,
    });
  },

  persistToLocalStorage: () => {
    const { cart, total, count } = get();
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toString());
    localStorage.setItem('count', count.toString());
  },

  calculateTotal: (cartItems) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  // Enhanced addToCart to handle product variants
  addToCart: (updatedProduct, quantity = 1, selectedVariants = {}) => {
    const { selectedColor, selectedSize } = selectedVariants;
    
    // Create a unique cart item ID based on product + variants
    const variantKey = `${selectedColor || 'no-color'}-${selectedSize || 'no-size'}`;
    const cartItemId = `${updatedProduct.id}-${variantKey}-${Date.now()}`;
    
    // Check if the exact same variant already exists in cart
    const existingItemIndex = get().cart.findIndex(item => 
      item.updatedProductId === updatedProduct.id && 
      item.selectedColor === selectedColor && 
      item.selectedSize === selectedSize
    );

    let newCart;
    
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      newCart = [...get().cart];
      newCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new cart item with all product information
      const newCartItem = {
        cartItemId,
        productId: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        prevprice: updatedProduct.prevprice || null,
        category: updatedProduct.category,
        images: updatedProduct.images || [],
        specifications: updatedProduct.specifications || [],
        
        // Variant information
        selectedColor,
        selectedSize,
        availableColors: updatedProduct.colors || [],
        availableSizes: updatedProduct.sizes || [],
        
        // Inventory information
        inventoryType: updatedProduct.inventoryType,
        sizeInventory: updatedProduct.sizeInventory || {},
        colorInventory: updatedProduct.colorInventory || {},
        
        // Cart specific
        quantity,
        addedAt: new Date().toISOString(),
        
        // Store the original product data for reference
        originalProduct: updatedProduct
      };
      
      newCart = [...get().cart, newCartItem];
    }

    const newTotal = get().calculateTotal(newCart);
    const newCount = newCart.length;

    set({
      cart: newCart,
      total: newTotal,
      count: newCount,
    });

    get().persistToLocalStorage();
  },

  // Update quantity of specific cart item
  updateQuantity: (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(cartItemId);
      return;
    }

    const newCart = get().cart.map(item => 
      item.cartItemId === cartItemId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    const newTotal = get().calculateTotal(newCart);

    set({
      cart: newCart,
      total: newTotal,
    });

    get().persistToLocalStorage();
  },

  // Check if specific variant has enough stock
  checkStock: (productId, selectedColor, selectedSize, requestedQuantity) => {
    const cartItem = get().cart.find(item => 
      item.productId === productId && 
      item.selectedColor === selectedColor && 
      item.selectedSize === selectedSize
    );

    if (!cartItem) return false;

    const { inventoryType, sizeInventory, colorInventory } = cartItem;
    let availableStock = 0;

    if (inventoryType === 'color' && colorInventory) {
      if (selectedSize && colorInventory[selectedColor]) {
        availableStock = colorInventory[selectedColor][selectedSize] || 0;
      } else {
        availableStock = colorInventory[selectedColor] || 0;
      }
    } else if (inventoryType === 'size' && sizeInventory) {
      availableStock = sizeInventory[selectedSize] || 0;
    } else {
      availableStock = cartItem.originalProduct?.stock || 0;
    }

    return availableStock >= requestedQuantity;
  },

  // Get available stock for a specific variant
  getAvailableStock: (product, selectedColor, selectedSize) => {
    const { inventoryType, sizeInventory, colorInventory, stock } = product;
    
    if (inventoryType === 'color' && colorInventory) {
      if (selectedSize && colorInventory[selectedColor]) {
        return colorInventory[selectedColor][selectedSize] || 0;
      } else {
        return colorInventory[selectedColor] || 0;
      }
    } else if (inventoryType === 'size' && sizeInventory) {
      return sizeInventory[selectedSize] || 0;
    } else {
      return stock || 0;
    }
  },

  removeFromCart: (cartItemId) => {
    const newCart = get().cart.filter(item => item.cartItemId !== cartItemId);
    const newTotal = get().calculateTotal(newCart);
    const newCount = newCart.length;

    set({
      cart: newCart,
      total: newTotal,
      count: newCount,
    });

    get().persistToLocalStorage();
  },

  // Get cart summary with variant details
  getCartSummary: () => {
    const { cart, total, count } = get();
    
    return {
      items: cart.map(item => ({
        cartItemId: item.cartItemId,
        productId: item.productId,
        name: item.name,
        price: item.price,
        prevprice: item.prevprice,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        images: item.images,
        subtotal: item.price * item.quantity,
        specifications: item.specifications,
      })),
      total,
      count,
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    };
  },

  // Get items grouped by product (useful for order processing)
  getItemsByProduct: () => {
    const { cart } = get();
    const grouped = {};
    
    cart.forEach(item => {
      if (!grouped[item.productId]) {
        grouped[item.productId] = {
          product: item.originalProduct,
          variants: []
        };
      }
      
      grouped[item.productId].variants.push({
        cartItemId: item.cartItemId,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      });
    });
    
    return grouped;
  },

  clearCart: () => {
    set({ cart: [], total: 0, count: 0 });
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
    localStorage.removeItem('count');
  },

  setReceiptTotal: (receiptTotal) => set({ receiptTotal }),
  setUserData: (data) => set({ userData: data }),
  setClientSecret: (secret) => set({ clientSecret: secret }),
  setOrderId: (orderId) => set({ orderId }),
}));