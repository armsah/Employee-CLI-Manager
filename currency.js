// Currency data ---------------------------------------------------------

// Fetch the latest currency conversion rates from USD
export const getCurrencyConversionData = async () => {
  try {
    const headers = new Headers();
    headers.append('apikey', 'YOUR_API_KEY_HERE');

    const options = {
      method: 'GET',
      redirect: 'follow',
      headers,
    };

    const response = await fetch(
      'https://api.apilayer.com/exchangerates_data/latest?base=USD',
      options
    );

    if (!response.ok) {
      throw new Error(`Cannot fetch currency data. Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.rates) {
      throw new Error('Invalid currency data received from API.');
    }

    return data;
  } catch (err) {
    console.error('Error fetching currency data:', err.message);
    throw err;
  }
};

// Convert a USD salary into a formatted currency string
export const getSalary = (amountUSD, currency, currencyData) => {
  if (!currencyData || !currencyData.rates) {
    throw new Error('Currency data not loaded.');
  }

  const upperCurrency = currency.toUpperCase();

  if (upperCurrency !== 'USD' && !(upperCurrency in currencyData.rates)) {
    throw new Error(`Currency "${currency}" not found in conversion data.`);
  }

  const rate = upperCurrency === 'USD' ? 1 : currencyData.rates[upperCurrency];
  const amount = amountUSD * rate;

  // Format the salary nicely
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: upperCurrency,
  }).format(amount);
};
