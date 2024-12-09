<script setup>
import BaseButton from "./BaseButton.vue";
import Logo from "./Logo.vue";
</script>
<template>
  <section class="py-4 md:py-10">
    <div class="container max-w-screen-xl px-4 mx-auto">
      <nav class="flex items-center justify-between mb-5">
        <Logo/>
        <BaseButton
          type="secondary"
          href="/Resume-Dev-Kabir.pdf"
          download
        >
          Get my CV
        </BaseButton>
      </nav>

      <div class="flex flex-col gap-6">
        <div class="flex justify-center">
          <img
            src="./../assets/devkabir.webp"
            alt="Image of Dev kabir"
            class="rounded-full w-72 h-72"
          />
        </div>
        <div class="flex flex-col items-center gap-6">
          <h1 class="text-lg font-bold text-slate-600 md:text-2xl">
            Dev Kabir
          </h1>

          <h2 class="font-semibold leading-none text-slate-800 md:text-xl">
            WordPress Plugin Developer | PHP & JavaScript Specialist | 150+ Plugins Developed
          </h2>

          <BaseButton type="primary" href="https://www.linkedin.com/in/dev-kabir/">
            Hire me
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
