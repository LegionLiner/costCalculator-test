<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getPrice } from '../composables/getPrice.ts';
import UISelect from './UI/UISelect.vue';

const dict = ref({
  "RUB": "рублей",
  "KZT": "тенге",
  "CNY": "юаней"
});
const plans = ref({
  standart: {
    month: 100,
    year: 1000
  },
  advanced: {
    month: 150,
    year: 1400
  }
}) as {
  [key: string]: any
};
const currencies = ref([
  {
    title: 'Российский рубль',
    value: 'RUB'
  },
  {
    title: 'Казахский тенге',
    value: 'KZT'
  },
  {
    title: 'Китайский юань',
    value: 'CNY'
  }
]);
const tarif = ref([
  {
    title: 'Стандартный',
    value: 'standart'
  },
  {
    title: 'Продвинутый',
    value: 'advanced'
  },
]);
const periods = ref([
  {
    title: 'За месяц',
    value: 'month'
  },
  {
    title: 'За год',
    value: 'year'
  },
]);

const result = getPrice(0, "RUB");
const discount = getPrice(0, "RUB");
const selectedPeriod = ref('');
const selectedTarif = ref('');

const selectedPlan = computed(() => {
  if (!selectedTarif.value || !selectedPeriod.value || !result.currency.value) {
    return false;
  }
  if (selectedPeriod.value === 'year') {
    if (selectedTarif.value === 'standart') {
      discount.price.value = 200;
    }
    if (selectedTarif.value === 'advanced') {
      discount.price.value = 400;
    }
  } else {
    discount.price.value = 0;
  }
  result.price.value = plans.value[selectedTarif.value][selectedPeriod.value];
  return true;
});

watch(result.currency, () => {
  discount.currency.value = result.currency.value;
});

</script>

<template>
  <div class="main">
    <div class="block">
      <p>Тариф:</p>
      <UISelect placeholder="Выберите тариф" v-model="selectedTarif" :items="tarif" />
    </div>
    <div class="block">
      <p>Валюта:</p>
      <UISelect placeholder="Выберите валюту" v-model="result.currency.value" :items="currencies" />
    </div>
    <div class="block">
      <p>Период оплаты:</p>
      <UISelect placeholder="Выберите период" v-model="selectedPeriod" :items="periods" />
    </div>
    <div class="block">
      <p v-if="selectedPlan">
        Сумма: {{ result.value }} {{ dict[result.currency.value] }}
        <span v-if="discount.price.value"> с учетом скидки, ваша скидка: {{ discount.value }} {{ dict[result.currency.value]}}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 500px;
}

@media (width < 600px) {
  .main {
    width: auto;
  }
}
</style>
