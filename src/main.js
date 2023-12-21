import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiWordpress, BiTools  , BiTrophy , BiGraphUpArrow , FaShopify, RiTwitterLine ,RiFacebookCircleLine, RiLinkedinBoxLine, RiGithubFill, MdAlternateemail      } from "oh-vue-icons/icons";
addIcons(BiWordpress, BiTools  , BiTrophy , BiGraphUpArrow , FaShopify, RiTwitterLine, RiFacebookCircleLine, RiLinkedinBoxLine, RiGithubFill, MdAlternateemail         );
createApp(App).component('v-icon', OhVueIcon).mount('#app')
