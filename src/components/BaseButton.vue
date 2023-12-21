<script setup>
defineProps({
  type: String,
  href: String,
});
</script>
<template>
  <a
    :href="href || '#'"
    :target="href ? '_blank' : '_self'"
    class="px-4 py-2 font-medium capitalize transition duration-500 ease-linear rounded-md shadow md:font-medium w-fit"
    :class="{
      'pointer-events-none ': !href,
      'text-white bg-slate-700 hover:bg-slate-50 hover:text-slate-700':
        type === 'primary',
      'text-slate-700 bg-white hover:bg-slate-700 hover:text-white':
        type === 'secondary',
    }"
  >
    <slot />
  </a>
</template>
