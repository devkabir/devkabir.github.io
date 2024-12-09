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
      company: "Roadmap Studios",
      location: "Project-Based",
      role: "WordPress Plugin Developer",
      start: "Oct 2023",
      end: "Mar 2024",
    },
    {
      company: "LogiSwitch",
      location: "Project-Based",
      role: "WordPress Plugin Developer",
      start: "Nov 2022",
      end: "Sept 2023",
    },
    {
      company: "Gompels",
      location: "Project-Based",
      role: "WordPress Plugin Developer",
      start: "Nov 2021",
      end: "Nov 2022",
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
          <h3 class="text-base font-bold capitalize text-slate-600">
            Company
          </h3>
          <h3
            class="text-base font-bold text-center capitalize text-slate-600"
          >
            Position
          </h3>
          <h3
            class="text-base font-bold text-right capitalize text-slate-600"
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
            class="grid text-base font-medium capitalize text-slate-500 sm:flex sm:gap-2"
          >
            <span class="font-semibold">{{ item.company }}</span>
            <span class="font-medium text-slate-400"
              >/ {{ item.location }}</span
            >
          </p>
          <p
            class="text-base font-medium text-center capitalize text-slate-500"
          >
            {{ item.role }}
          </p>
          <p
            class="grid justify-end text-base font-medium text-right capitalize text-slate-500 md:gap-2 lg:flex"
          >
            <span class="block">
              {{ generateExperienceTenure(item.start, item.end).tenureString }}
            </span>
            <span class="block font-normal text-slate-400">
              {{ generateExperienceTenure(item.start, item.end).durationString }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
