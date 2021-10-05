import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import "./assets/index.css"

store.commit("setTime", new Date())
store.commit("setAudioError", !audio_available)

const app = createApp(App)
app.use(store)
app.mount("#app")
