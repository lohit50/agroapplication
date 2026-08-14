const UNSPLASH_ACCESS_KEY = 'uRQCQgMwGJikNflzkljRmhXCZXfDHy64ErO-WaLpAKY'; // Your Access Key

const fetchUnsplashImage = async (query) => {
  const refinedQuery = `${query} vegetable`;  // Default refinement for vegetables
  const url = `https://api.unsplash.com/search/photos?query=${refinedQuery}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small; // Use small size URL
    } else {
      return 'https://via.placeholder.com/150'; // Fallback if no image is found
    }
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return 'https://via.placeholder.com/150'; // Fallback in case of error
  }
};

export const FruitsData = async () => {
  const fruits = [
    { name: "Apple" },
    { name: "Banana" },
    { name: "Orange" },
    { name: "Mango" },
    { name: "Grapes" },
    { name: "Pineapple" },
    { name: "Papaya" },
    { name: "Guava" },
    { name: "Strawberry" },
    { name: "Watermelon" }
  ];

  const fruitsWithImages = await Promise.all(
    fruits.map(async (fruit) => ({
      ...fruit,
      image: await fetchUnsplashImage(`${fruit.name} fruit`), 
    }))
  );

  return fruitsWithImages;
};

export const VegetablesData = async () => {
  const vegetables = [
    { name: "Tomato" },
    { name: "Potato" },
    { name: "Carrot" },
    { name: "Onion" },
    { name: "Spinach" },
    { name: "Cabbage" },
    { name: "Cauliflower" },
    { name: "Brinjal" },
    { name: "Capsicum" },
    { name: "Garlic" }
  ];

  const vegetablesWithImages = await Promise.all(
    vegetables.map(async (vegetable) => ({
      ...vegetable,
      image: await fetchUnsplashImage(`${vegetable.name} vegetable`), // Refined query for vegetables
    }))
  );

  return vegetablesWithImages;
};

// Others Data
export const OthersData = async () => {
  const others = [
    { name: "Honey" },
    { name: "Milk" },
    { name: "Eggs" },
    { name: "Cheese" },
    { name: "Butter" },
    { name: "Paneer" },
    { name: "Yogurt" },
    { name: "Ghee" },
    { name: "Pickles" },
    { name: "Jaggery" }
  ];

  const othersWithImages = await Promise.all(
    others.map(async (other) => ({
      ...other,
      image: await fetchUnsplashImage(`${other.name} food`), // Refined query for other products
    }))
  );

  return othersWithImages;
};

const fetchUnsplashImageFromCollection = async (query, collectionId) => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&collections=${collectionId}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    } else {
      return 'https://via.placeholder.com/150'; // Fallback if no image is found
    }
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return 'https://via.placeholder.com/150'; // Fallback in case of error
  }
};
