// // backend/routes/payment.js
// const express = require('express');
// const router = express.Router();
// require('dotenv').config(); // Make sure this is at the top
// const Stripe = require('stripe');
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Now correctly using env
// const Order = require('../models/Order');



// // Use raw body parser for Stripe webhook
// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Add this to your .env file

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the checkout.session.completed event
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const orderId = session.metadata.orderId;

//     try {
//       const order = await Order.findById(orderId);
//       if (order) {
//         order.status = 'completed';
//         await order.save();
//         console.log(`Order ${orderId} status updated to completed`);
//       } else {
//         console.error(`Order ${orderId} not found`);
//       }
//     } catch (err) {
//       console.error('Error updating order status:', err);
//     }
//   }

//   res.status(200).json({ received: true });
// });

// router.post('/create-checkout-session', async (req, res) => {
//   const { cartItems, userId } = req.body;

//   console.log('Request body:', req.body);

//   // Validate cartItems
//   if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
//     console.log('Invalid or empty cartItems:', cartItems);
//     return res.status(400).json({ success: false, message: 'Cart items are required and must be a non-empty array' });
//   }

//   // Validate userId
//   if (!userId) {
//     console.log('Missing userId in request body');
//     return res.status(400).json({ success: false, message: 'User ID is required' });
//   }

//   try {
//     // Create line items for Stripe and calculate total amount
//     const line_items = cartItems.map(item => {
//       const product = item.productId;
//       if (!product || !product.name || !product.sellingPrice || !item.quantity) {
//         throw new Error(`Invalid item in cart: ${JSON.stringify(item)}`);
//       }
//       return {
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: product.name,
//           },
//           unit_amount: Math.round(product.sellingPrice * 100), // Stripe expects amount in paise
//         },
//         quantity: item.quantity,
//       };
//     });

//     // Calculate total amount
//     const totalAmount = cartItems.reduce((total, item) => {
//       return total + (item.productId.sellingPrice * item.quantity);
//     }, 0);

//     // Create the order
//     const order = new Order({
//       userId,
//       items: cartItems,
//       totalAmount,
//       status: 'pending',
//     });
//     await order.save();

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       success_url: `http://localhost:3000/success?orderId=${order._id}`,
//       cancel_url: 'http://localhost:3000/cancel',
//       metadata: { userId, orderId: order._id.toString() }, // Ensure orderId is a string
//     });

//     res.json({ success: true, sessionId: session.id });
//   } catch (err) {
//     console.error('Error creating checkout session:', err);
//     res.status(500).json({ success: false, message: 'Failed to create checkout session', error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Use raw body parser for Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    try {
      const order = await Order.findById(orderId);
      if (order) {
        order.status = 'completed';
        await order.save();
        console.log(`Order ${orderId} status updated to completed`);
      } else {
        console.error(`Order ${orderId} not found`);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  }

  res.status(200).json({ received: true });
});

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems, userId } = req.body;

  console.log('Request body:', req.body);

  // Validate cartItems
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    console.log('Invalid or empty cartItems:', cartItems);
    return res.status(400).json({ success: false, message: 'Cart items are required and must be a non-empty array' });
  }

  // Validate userId
  if (!userId) {
    console.log('Missing userId in request body');
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    // Define handling and delivery charges (same as in Cart.js)
    const handlingCharges = 9; // ₹9
    const deliveryCharges = 36; // ₹36

    // Create line items for Stripe (cart items)
    const line_items = cartItems.map(item => {
      const product = item.productId;
      if (!product || !product.name || !product.sellingPrice || !item.quantity) {
        throw new Error(`Invalid item in cart: ${JSON.stringify(item)}`);
      }
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.sellingPrice * 100), // Stripe expects amount in paise
        },
        quantity: item.quantity,
      };
    });

    // Add handling charges as a line item
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Handling Charges',
        },
        unit_amount: Math.round(handlingCharges * 100), // ₹9 in paise
      },
      quantity: 1,
    });

    // Add delivery charges as a line item
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: Math.round(deliveryCharges * 100), // ₹36 in paise
      },
      quantity: 1,
    });

    // Calculate total amount (cart items + handling + delivery)
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.productId.sellingPrice * item.quantity);
    }, 0);
    const totalAmount = subtotal + handlingCharges + deliveryCharges;

    // Create the order
    const order = new Order({
      userId,
      items: cartItems,
      totalAmount, // Updated total includes handling and delivery charges
      status: 'pending',
    });
    await order.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:3000/success?orderId=${order._id}`,
      cancel_url: 'http://localhost:3000/cancel',
      metadata: { userId, orderId: order._id.toString() },
    });

    res.json({ success: true, sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ success: false, message: 'Failed to create checkout session', error: err.message });
  }
});

module.exports = router;