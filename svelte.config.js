import adapter from "@sveltejs/adapter-netlify";
export default {
  runes: true,

  kit: {
    adapter: adapter({
      edge: false
    })
  }
};