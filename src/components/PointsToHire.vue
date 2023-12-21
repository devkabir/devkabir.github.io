<script setup>
import Card from "./Card.vue";

const points = [
  {
    title: "Experience across platforms",
    description:
      "With over 4 years of experience in diverse web development platforms like WordPress, Shopify, and Laravel, I bring a broad skill set to the table. This versatility enables me to handle a wide range of web development tasks and projects effectively.",
    icon: "bi-tools", // Suggested icon representing multiple tools or platforms
  },
  {
    title: "Proven track record",
    description:
      "My unique WooCommerce Extension, sold multiple times on Fiverr, has empowered numerous entrepreneurs in their businesses. This proven track record indicates that my work is valued by others and could potentially add value to your project as well.",
    icon: "bi-trophy", // Suggested icon representing achievement or success
  },
  {
    title: "Commitment to learning and growth",
    description:
      "I am not just experienced, but also deeply committed to continuous learning. Currently, I am honing my skills in WordPress Plugin Development and Shopify App Development. This commitment to growth ensures that I stay abreast of the latest trends and technologies in web development.",
    icon: "bi-graph-up-arrow", // Suggested icon representing growth
  },
];
</script>
<template>
  <section class="py-10 md:py-16">
    <div class="container max-w-screen-xl px-4 mx-auto">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="(item, index) in points" :key="index" type="primary">
          <div
            class="flex justify-center w-20 py-3 mb-2 rounded-md bg-slate-100 md:mb-4 md:py-6"
          >
            <v-icon :name="item.icon" class="w-auto h-7"></v-icon>
          </div>

          <h2
            class="mb-4 text-base font-medium capitalize text-slate-700 xl:text-xl"
          >
            {{ item.title }}
          </h2>

          <p class="text-base font-normal text-slate-500">
            {{ item.description }}
          </p>
        </Card>
      </div>
    </div>
  </section>
</template>
