export const MOCK_ORDERS = [
  {
    id: 'ORD-98214',
    date: '2026-08-15T10:30:00Z',
    status: 'Delivered',
    total: 96.00,
    shippingAddress: {
      fullName: 'Sample Artisan Customer',
      email: 'test@souravcreations.com',
      phone: '+1 555-0192',
      address: '123 Craft Studio Way',
      city: 'New York',
      state: 'NY',
      pincode: '10001'
    },
    items: [
      {
        product: {
          id: 'prod-101',
          name: 'Botanical Amber Soy Vessel',
          price: 34.00,
          images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80']
        },
        quantity: 2
      },
      {
        product: {
          id: 'prod-102',
          name: 'Speckled Studio Coffee Mug',
          price: 28.00,
          images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80']
        },
        quantity: 1
      }
    ]
  }
];