export const CreateAdminOrderNotificationEmail = (cartContent, total, formData, trackingNumber, orderId) => {
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
            <img src="${item.images && item.images[0] ? item.images[0] : 'https://placehold.co/80x80'}" 
                 alt="${item.name}" 
                 style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" />
          </td>
          <td style="padding: 12px; border: 1px solid #ddd;">
            <strong>${item.name}</strong>
            ${variantDisplay}
            ${item.cartItemId ? `<br><small style="color: #999; font-family: monospace;">ID: ${item.cartItemId.substring(0, 12)}...</small>` : ''}
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
        <h1 style="margin: 0; font-size: 28px;">🎉 NEW ORDER RECEIVED!</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Amplus Fashion</p>
      </div>

      <!-- Order Summary Box -->
      <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #333; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">📋 Order Summary</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <strong>Order ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${orderId}</code>
          </div>
          <div>
            <strong>Tracking:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${trackingNumber}</code>
          </div>
          <div>
            <strong>Order Date:</strong> ${orderDate}
          </div>
          <div>
            <strong>Items:</strong> ${totalItems} item(s)
          </div>
        </div>
      </div>

      <!-- Customer Information -->
      <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h2 style="background: #333; margin: -20px -20px 20px -20px; padding: 15px 20px; color: white; border-radius: 8px 8px 0 0;">
          👤 Customer Information
        </h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <p><strong>Name:</strong> ${formData?.firstName} ${formData?.lastName}</p>
            <p><strong>Email:</strong> ${formData?.email}</p>
            <p><strong>Phone:</strong> ${formData?.phone}</p>
          </div>
          <div>
            <p><strong>Address:</strong> ${formData?.address}</p>
            <p><strong>City:</strong> ${formData?.city}</p>
            <p><strong>State & ZIP:</strong> ${formData?.state} ${formData?.postalCode}</p>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0; overflow: hidden;">
        <h2 style="background: #333; margin: 0; padding: 15px 20px; color: white;">
          🛍️ Ordered Items (${totalItems} items)
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
        <h2 style="margin: 0; font-size: 24px;">💰 Order Total: $${total.toFixed(2)}</h2>
      </div>

      <!-- Action Items for Admin -->
      <div style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="color: #374151; margin: 0 0 15px 0;">⚠️ Action Required</h3>
        <ul style="color: #374151; margin: 0; padding-left: 20px;">
          <li>Process and prepare order for shipment</li>
          <li>Update order status in admin panel</li>
          <li>Generate shipping label with tracking: <strong>${trackingNumber}</strong></li>
          <li>Send customer shipping confirmation when dispatched</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 20px; color: #666; border-top: 1px solid #eee; margin-top: 30px;">
        <p style="margin: 0;">Amplus Fashion Admin Panel</p>
        <p style="margin: 5px 0 0 0; font-size: 12px;">This email was automatically generated when a customer completed their purchase.</p>
      </div>
    </div>
  `;
};