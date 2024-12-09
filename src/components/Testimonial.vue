<script setup>
import Card from "./Card.vue";
import SectionTitle from "./SectionTitle.vue";
import BaseButton from "./BaseButton.vue";

const section = {
  title: "Feedback",
  description: "Here are some reviews from people I've worked with:",
  review: [
    {
      review:
        "Kabir is very skilled and friendly to work with. He has helped us greatly in migrating a plugin to Vue.js WP plugin.",
      author: "Fawad Tiemoerie",
      location: "Tech Lead at Roadmap Studios",
    },
    {
      review:
        "Dev did an excellent job in developing a plugin that accomplished this task. The interface has been working flawlessly for over a year. Once again, I highly recommend him.",
      author: "Steve Pollock",
      location: "VP, Sales and Marketing at LogiSwitch",
    },
    {
      review:
        "Kabir is an insanely talented developer, the code he writes is beautifully optimized and works like magic. He pays attention to detail, is a master at debugging and is truly professional when it comes to communication and patience.",
      author: "Atdhe Boshnjaku",
      location: "Software Developer at Gompels",
    },
  ],
};
</script>
<template>
  <section class="py-10 md:py-16">
    <div class="container max-w-screen-xl px-4 mx-auto">
      <SectionTitle :title="section.title" :description="section.description" />

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(item, index) in section.review"
          :key="index"
          type="primary"
        >
          <p class="mb-4 font-normal text-slate-500 text-md">
            {{ item.review }}
          </p>
          <div>
            <h6 class="font-semibold text-slate-500 text-md">
              {{ item.author }}
            </h6>
            <span class="text-sm font-medium text-slate-500">
              - {{ item.location }}
            </span>
          </div>
        </Card>
      </div>
      <div class="flex justify-center py-4">
        <base-button href="https://www.fiverr.com/developerkabir" type="primary">
          Learn More
        </base-button>
      </div>
    </div>
  </section>
</template>
