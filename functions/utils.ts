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

  export function formatTimeAgo(timestamp: string | number | Date): string {
    const now: Date = new Date();
    const past: Date = new Date(timestamp);
    const seconds: number = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, value] of Object.entries(intervals)) {
        const interval: number = Math.floor(seconds / value);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}
