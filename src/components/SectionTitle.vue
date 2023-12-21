<script setup>
defineProps({
  title: String,
  description: String,
});
</script>
<template>
  <div class="mb-10 lg:mb-15">
    <h2 class="mb-5 text-3xl font-medium text-slate-700 md:text-4xl">
      {{ title }}
    </h2>

    <p class="font-normal text-slate-500 md:text-base">
      {{ description }}
    </p>
  </div>
</template>
