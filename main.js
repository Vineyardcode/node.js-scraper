import { get } from 'axios';

const minPrice = 0;
const maxPrice = 100000;

const fetchProductsFromAnImaginaryApi = async (minPrice, maxPrice) => {
    const apiUrl = `https://api.ecommerce.com/products?minPrice=${minPrice}&maxPrice=${maxPrice}`;
    
    try {
        const response = await get(apiUrl);
        return response.data;
    } catch (err) {
        console.log(err)
    }
};

const fetchAllProductsUsingBinarySearchLikeApproachToOvercomeTheAPIsLimitations = async (minPrice, maxPrice) => {
    const products = [];

    while (minPrice <= maxPrice) {
      try {
          const response = await fetchProductsFromAnImaginaryApi(minPrice, maxPrice);

          const totalProducts = response.total || 0;
          const currentProducts = response.count || 0;
          const currentBatch = response.products || [];

          products.push(...currentBatch);

          if (currentProducts === 1000 && products.length < totalProducts) {
              const midPrice = Math.floor((minPrice + maxPrice) / 2);
              if (midPrice === minPrice) {
                  break; 
              }
              minPrice = midPrice + 1;
          } else {
              break;
          }
        } catch (err) {
            console.err('err fetching products:', err);
            break; 
        }
    }

    return products;
};

fetchAllProductsUsingBinarySearchLikeApproachToOvercomeTheAPIsLimitations(minPrice, maxPrice)
    .then((products) => {
        console.log('All products:', products);
    })
    .catch((err) => {
        console.err('Error:', err);
    });
