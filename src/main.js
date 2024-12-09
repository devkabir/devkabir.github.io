import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiWordpress, BiTools  , BiTrophy , BiGraphUpArrow , FaShopify, RiTwitterLine ,RiFacebookCircleLine, RiLinkedinBoxLine, RiGithubFill, MdAlternateemail      } from "oh-vue-icons/icons";
import VueGtag from "vue-gtag";
addIcons(BiWordpress, BiTools  , BiTrophy , BiGraphUpArrow , FaShopify, RiTwitterLine, RiFacebookCircleLine, RiLinkedinBoxLine, RiGithubFill, MdAlternateemail         );
createApp(App).component('v-icon', OhVueIcon).use(VueGtag, {
    config: { id: import.meta.env.VITE_GA_ID },
  }).mount('#app')
