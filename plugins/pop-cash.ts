export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    return;
  }
  var uid = "479923";
  var wid = "724283";
  var pop_tag = document.createElement("script");
  pop_tag.src = "//cdn.popcash.net/show.js";
  document.body.appendChild(pop_tag);
  pop_tag.onerror = function () {
    pop_tag = document.createElement("script");
    pop_tag.src = "//cdn2.popcash.net/show.js";
    document.body.appendChild(pop_tag);
  };
});
