export const createOrderSummaryEmail = (cartContent, total, formData, trackingNumber, orderId) => {
  const itemsHtml = cartContent
    .map((item) => {
      // Handle variant information
      const variantInfo = [];
      if (item.selectedColor) {
        variantInfo.push(`<span style="color: #666; font-size: 12px;">Color: ${item.selectedColor}</span>`);
      }
      if (item.selectedSize) {
        variantInfo.push(`<span style="color: #666; font-size: 12px;">Size: ${item.selectedSize}</span>`);
      }
      
      const variantDisplay = variantInfo.length > 0 
        ? `<br>${variantInfo.join(' • ')}`
        : '';

      return `
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
            <img src="${item.images && item.images[0] ? item.images[0] : '/placeholder-image.jpg'}" 
                 alt="${item.name}" 
                 style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" />
          </td>
          <td style="padding: 12px; border: 1px solid #ddd;">
            <strong>${item.name}</strong>
            ${variantDisplay}
          </td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
            $${item.price ? item.price.toFixed(2) : '0.00'}
            ${item.prevprice ? `<br><small style="color: #999; text-decoration: line-through;">$${item.prevprice.toFixed(2)}</small>` : ''}
          </td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">
            ${item.quantity}
          </td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold; color: #333;">
            $${item.subtotal ? item.subtotal.toFixed(2) : (item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      `;
    })
    .join('');

  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const totalItems = cartContent.reduce((sum, item) => sum + item.quantity, 0);

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1a1a1a, #333); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">✨ Thank You for Your Order!</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Amplus Fashion</p>
      </div>

      <!-- Personal Greeting -->
      <div style="padding: 20px; background: #f8f9fa;">
        <p style="margin: 0; font-size: 18px;">Hi <strong>${formData?.firstName} ${formData?.lastName}</strong>,</p>
        <p style="margin: 10px 0 0 0; color: #666;">Thanks for shopping with us! Your order has been confirmed and we're preparing it for shipment.</p>
      </div>

      <!-- Order Details Box -->
      <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">📋 Order Details</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <strong>Order ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${orderId}</code>
          </div>
          <div>
            <strong>Tracking Number:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${trackingNumber}</code>
          </div>
          <div>
            <strong>Order Date:</strong> ${orderDate}
          </div>
          <div>
            <strong>Items:</strong> ${totalItems} item(s)
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0; overflow: hidden;">
        <h2 style="background: #333; margin: 0; padding: 15px 20px; color: white;">
          🛍️ Your Items (${totalItems} items)
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold;">Image</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold;">Product Details</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold;">Price</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold;">Qty</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <!-- Order Total -->
      <div style="background: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin: 0; font-size: 24px;">💰 Total: $${total.toFixed(2)}</h2>
      </div>

      <!-- Shipping Information -->
      <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h2 style="background: #333; margin: -20px -20px 20px -20px; padding: 15px 20px; color: white; border-radius: 8px 8px 0 0;">
          🚚 Shipping Information
        </h2>
        <div style="color: #555;">
          <p style="margin: 5px 0;"><strong>${formData?.firstName} ${formData?.lastName}</strong></p>
          <p style="margin: 5px 0;">${formData?.phone}</p>
          <p style="margin: 5px 0;">${formData?.address}</p>
          <p style="margin: 5px 0;">${formData?.city}, ${formData?.state} ${formData?.postalCode}</p>
        </div>
      </div>

      <!-- Tracking Information -->
      <div style="background: #f1f3f4; border: 1px solid #d1d5db; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="color: #374151; margin: 0 0 10px 0;">📦 Track Your Order</h3>
        <p style="color: #374151; margin: 0;">
          Your tracking number is <strong>${trackingNumber}</strong>. 
          Once your order ships, you'll receive another email with tracking details to monitor your package.
        </p>
      </div>

      <!-- Footer Message -->
      <div style="padding: 20px; text-align: center; color: #666; border-top: 1px solid #eee; margin-top: 30px;">
        <p style="margin: 0 0 10px 0;">
          We hope that you will be pleased with your purchase. 
          If you have any questions or concerns regarding your order, kindly contact us through our website or Instagram.
        </p>
        <p style="margin: 0; font-weight: bold; color: #333;">Thank you for shopping with Amplus Fashion! ✨</p>
      </div>
    </div>
  `;
};