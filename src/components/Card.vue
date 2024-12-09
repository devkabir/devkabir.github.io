<script setup>
defineProps({
  type: String,
});
</script>
<template>
  <div
    class="transition duration-500 ease-linear rounded-md cursor-pointer md:py-10 md:px-8 hover:shadow-md hover:shadow-slate-300 hover:bg-slate-100"
    :class="{
      'bg-slate-50': type === 'primary',
      'bg-slate-200': type === 'secondary',
    }"
  >
    <slot />
  </div>
</template>
