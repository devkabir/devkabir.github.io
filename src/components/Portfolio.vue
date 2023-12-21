<script setup>
import BaseButton from "./BaseButton.vue";
import Card from "./Card.vue";
import SectionTitle from "./SectionTitle.vue";
const section = {
  title: "My Work",
  description: "These are some of my best projects.",
  portfolio: [
    {
      title: "Enable CORS",
      description:
        "This plugin helps websites work better. It removes errors and lets you access resources from different places.",
      icon: "bi-wordpress",
      url: "https://wordpress.org/plugins/enable-cors/",
    },
    {
      title: "WordPress Plugin Redesign",
      description:
        "I changed the design of a WordPress plugin admin panel. I used PHP, vue.js with pinia, tailwindcss, and TypeScript. It's now easier to use and works better.",
      icon: "bi-wordpress",
      url: "https://www.fiverr.com/s/o01v0G",
    },
    {
      title: "Data Sync App",
      description:
        "This app keeps data updated between your shop and vendors. It can connect any shop with any vendor. You can choose how often it updates.",
      icon: "fa-shopify",
      url: "https://www.fiverr.com/s/KqgxXk",
    },
  ],
};
</script>
<template>
  <section class="py-10 md:py-16">
    <div class="container max-w-screen-xl px-4 mx-auto">
      <SectionTitle :title="section.title" :description="section.description" />
      <div class="flex flex-col items-center justify-center gap-10">
        <div class="flex gap-4">
          <Card
            v-for="(item, index) in section.portfolio"
            :key="index"
            type="white"
          >
            <a :href="item.url" rel="noopener noreferrer">
              <h4
                class="mb-5 font-semibold text-slate-700 capitalize md:text-2xl"
              >
                <v-icon :name="item.icon" class="w-auto h-8"></v-icon>
                {{ item.title }}
              </h4>

              <p class="font-normal text-slate-500 md:text-base">
                {{ item.description }}
              </p>
            </a>
          </Card>
        </div>
        <div>
          <BaseButton
            href="https://www.fiverr.com/developerkabir"
            type="primary"
          >
            Learn More
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
