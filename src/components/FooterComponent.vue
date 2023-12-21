<script setup>
const section = {
  title: "Let's Connect",
  description:
    "I'd love to hear from you. You can find me on these social media platforms.",
  icons: [
    {
      icon: "md-alternateemail",
      url: "mailto:dev.kabir01@gmail.com",
    },
    {
      icon: "ri-twitter-line",
      url: "https://twitter.com/DevKabir01",
    },
    {
      icon: "ri-facebook-circle-line",
      url: "https://www.facebook.com/dev.kabir01",
    },
    {
      icon: "ri-linkedin-box-line",
      url: "https://www.linkedin.com/in/dev-kabir/",
    },
    {
      icon: "ri-github-fill",
      url: "https://github.com/devkabir",
    },
  ],
};
</script>
<template>
  <footer class="py-10">
    <div class="container max-w-screen-xl px-4 mx-auto">
      <div class="text-center">
        <h1 class="mb-5 text-4xl font-medium text-slate-700 md:text-5xl">
          {{ section.title }}
        </h1>

        <p class="mb-20 font-normal text-slate-400 text-md md:text-lg">
          {{ section.description }}
        </p>

        <div class="flex items-center justify-center space-x-8">
          <a
            v-for="(item, index) in section.icons"
            :key="index"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-16 h-16 transition duration-500 ease-in-out rounded-full hover:bg-slate-200"
          >
            <v-icon
              :name="item.icon"
              class="w-8 h-8 text-slate-500 transition duration-500 ease-in-out hover:text-slate-800"
            ></v-icon>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
