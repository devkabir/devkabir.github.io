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
      title: "Defender",
      description:
        "Defender is a powerful WordPress security plugin that provides a comprehensive suite of features to protect websites from threats.",
      icon: "bi-wordpress",
      url: "https://wpmudev.com/project/wp-defender/",
    },
    {
      title: "Slide Gutenberg Blocks",
      description:
        "This plugin can help you create dynamic and interactive slider with gutenberg blocks.",
      icon: "bi-wordpress",
      url: "https://pluximo.com/slide-gutenberg-blocks/",
    },
  ],
};
</script>
<template>
  <section class="py-10 md:py-16">
    <div class="container max-w-screen-xl px-4 mx-auto">
      <SectionTitle :title="section.title" :description="section.description" />
      <div class="flex flex-col items-center justify-center gap-10">
        <div class="grid grid-cols-3 gap-4">
          <Card
            v-for="(item, index) in section.portfolio"
            :key="index"
            type="secondary"
          >
            <a :href="item.url" rel="noopener noreferrer">
              <h4
                class="mb-5 font-semibold capitalize text-slate-700 md:text-2xl"
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
