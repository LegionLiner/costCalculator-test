import { computed, ref } from "vue";

type Currency = "KZT" | "CNY" | "RUB";

const currencies = ["RUB", "KZT", "CNY"];
let rates = {} as { [key: string]: number };

fetch("https://www.cbr-xml-daily.ru/latest.js")
  .then((response) => response.json())
  .then((data) => {
    rates = data.rates;
  });
  

export function getPrice(val: number, cur: Currency) {

    const price = ref(val);
    const currency = ref<Currency>(cur);
    const value = computed(() => {
        if (currency.value === "RUB" || !currencies.includes(currency.value)) {
            return price.value;
        }
      return Math.round(price.value * rates[currency.value]);
    })

  return {
    price,
    currency,
    value
  };
}
