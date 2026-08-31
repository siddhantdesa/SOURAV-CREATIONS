let mockProducts = [
  {
    id: '1',
    name: '3D Miniature Photo Room Frame',
    price: 1499,
    category: 'Birthday Special',
    image: '/images/3d-frame.jpeg',
    description: 'Customized 3D shadow box frame featuring personalized photo prints, miniature Pikachu figurine, wall decor, and warm LED lighting.'
  },
  {
    id: '2',
    name: 'Custom Couple Anniversary Shadow Box',
    price: 1799,
    category: 'Anniversary Special',
    image: '/images/anniversary-frame.jpeg',
    description: 'Handcrafted romantic 3D couple room frame with personalized date calendar, photo wall, mini furniture, and soft LED lights.'
  },
  {
    id: '3',
    name: 'Handcrafted Photo Pop-up Ring Box',
    price: 699,
    category: 'Theme Special',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80',
    description: 'Surprise fold-out photo strip inside a traditional handcrafted velvet box with custom thread work.'
  },
  {
    id: '4',
    name: 'Personalized Resin Photo Rakhi',
    price: 499,
    category: 'Raksha Bandhan',
    image: '/images/rakhi-special.jpeg',
    description: 'Custom ocean-blue resin photo Rakhi with gold leafing details, presented on a handcrafted greeting card background.'
  },
  {
    id: '5',
    name: 'Virat Kohli Fan 3D Cricket Shadow Box',
    price: 1899,
    category: 'Cricket Special',
    image: '/images/cricket-frame.jpeg',
    description: 'Illuminated 3D cricket theme frame with mini jerseys, trophies, match photo collage, and cutouts for ultimate cricket fans.'
  },
  {
    id: '6',
    name: 'LED Illuminated Memory Frame',
    price: 1999,
    category: 'Birthday Special',
    image: '/images/3d-frame.jpeg',
    description: 'Multi-photo wall frame with built-in fairy lights, custom calendar date, and hand-lettered text.'
  }
];

export async function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockProducts]), 200);
  });
}

export async function getProductById(id) {
  return new Promise((resolve) => {
    const product = mockProducts.find((p) => p.id === id);
    setTimeout(() => resolve(product ? { ...product } : null), 200);
  });
}

export async function addProduct(newProduct) {
  return new Promise((resolve) => {
    const created = { ...newProduct, id: String(Date.now()) };
    mockProducts.push(created);
    setTimeout(() => resolve(created), 200);
  });
}

export async function updateProduct(id, updatedFields) {
  return new Promise((resolve) => {
    mockProducts = mockProducts.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setTimeout(() => resolve(true), 200);
  });
}

export async function deleteProduct(id) {
  return new Promise((resolve) => {
    mockProducts = mockProducts.filter((p) => p.id !== id);
    setTimeout(() => resolve(true), 200);
  });
}