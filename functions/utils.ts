export function formatPrice(price: number) {
    if (price < 0) return 'Invalid price';
  
    let formattedPrice;
  
    if (price >= 10000000) { // 1 crore = 10,000,000
      const crore = price / 10000000;
      formattedPrice = crore.toFixed(2);
      formattedPrice = formattedPrice.endsWith('.00') ? formattedPrice.slice(0, -3) : formattedPrice;
      formattedPrice += ' crore';
    } else if (price >= 100000) { // 1 lac = 100,000
      const lacs = price / 100000;
      formattedPrice = lacs.toFixed(2);
      formattedPrice = formattedPrice.endsWith('.00') ? formattedPrice.slice(0, -3) : formattedPrice;
      formattedPrice += ' lacs';
    } else {
      formattedPrice = price.toFixed(2);
      formattedPrice = formattedPrice.endsWith('.00') ? formattedPrice.slice(0, -3) : formattedPrice;
    }
  
    return formattedPrice;
  }