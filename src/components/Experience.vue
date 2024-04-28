<script setup>
import SectionTitle from "./SectionTitle.vue";
import {generateExperienceTenure } from "../composables"

const section = {
  title: "Professional Journey",
  description:
    "A snapshot of my professional trajectory and the impactful roles I've held.",
  experience: [
    {
      company: "WPMU DEV",
      location: "Remote",
      role: "WordPress Plugin Developer",
      start: "April 2024",
      end: "Present",
    },
    {
      company: "WordPress",
      location: "Self-Employed",
      role: "WordPress Plugin Developer",
      start: "Jan 2022",
      end: "Present",
    },
    {
      company: "Fiverr",
      location: "Remote",
      role: "WooCommerce & Shopify App Developer",
      start: "December 2019",
      end: "December 2023",
    },
    {
      company: "Technofelia",
      location: "Dhaka, Bangladesh",
      role: "Lead Developer",
      start: "January 2020",
      end: "January 2022",
    },
  ],
};
</script>
<template>
  <section class="py-10">
    <div class="container max-w-screen-xl px-4 mx-auto">
      <SectionTitle :title="section.title" :description="section.description" />

      <div class="grid gap-10">
        <div class="grid items-center grid-cols-3">
          <h3 class="text-base font-medium text-slate-600 capitalize">
            Company
          </h3>
          <h3
            class="text-base font-medium text-center text-slate-600 capitalize"
          >
            Position
          </h3>
          <h3
            class="text-base font-medium text-right text-slate-600 capitalize"
          >
            Years
          </h3>
        </div>
        <div
          class="grid items-center grid-cols-3"
          v-for="(item, index) in section.experience"
          :key="index"
        >
          <p
            class="grid text-base font-medium text-slate-500 capitalize sm:flex sm:gap-2"
          >
            <span>{{ item.company }}</span>
            <span class="font-normal text-slate-400"
              >/ {{ item.location }}</span
            >
          </p>
          <p
            class="text-base font-medium text-center text-slate-500 capitalize"
          >
            {{ item.role }}
          </p>
          <p
            class="grid justify-end text-base font-medium text-right text-slate-500 capitalize md:gap-2 lg:flex"
          >
            <span>
              {{ generateExperienceTenure(item.start, item.end).tenureString }}
            </span>
            <span class="font-normal text-slate-400">
              {{ generateExperienceTenure(item.start, item.end).durationString }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
