<script setup>
const props = defineProps({
  type: String,
  href: String,
  event_label: String
});

const triggerGaEvent = () => {
  window.gtag("event", "click", {
    event_category: "button",
    event_label: props.event_label,
  });
  window.open(props.href || "https://fiverr.com/devkabir", "_blank");
}
</script>
<template>
  <button
    type="button"
    @click.prevent="triggerGaEvent"
    class="px-4 py-2 font-medium capitalize transition duration-500 ease-linear rounded-md shadow md:font-medium w-fit"
    :class="{
      'text-white bg-slate-700 hover:bg-slate-50 hover:text-slate-700':
        type === 'primary',
      'text-slate-700 bg-slate-100 hover:bg-slate-700 hover:text-white':
        type === 'secondary',
    }"
  >
    <slot />
  </button>
</template>
