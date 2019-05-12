/* ===== progress bar variables ===== */
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
    current_progress += 10;
    $("#dynamic")
    .css("width", current_progress + "%")
    .attr("aria-valuenow", current_progress)
    .text(current_progress + "% Complete");
    if (current_progress >= 100)
      clearInterval(interval);
  }, 1000);
});

new Vue({
  el: "#bodyWrapper",
  name: "user_home_page_vue",
  data: {
    username: "HyoungJo"
  },
  methods: {
    // on edit clicked!
    edit() {

    },
    // user page for poked/betonyou/poster
    poking() {

    },
    betonyou() {

    },
    poster() {

    },
  },
  created() {
    console.log("userhomepage js loaded");

    axios.get("to our flask")
      .then(res => {
        /* ===== Header ===== */
        // bring name and change user name variable
        // bring start date
        // bring end date => and draw the bar. tick the clock.

        /* ===== Carousel ===== */
        // bring user goal items

        // bring cheerings from friends
      })
      .catch(err => console.log(err));
  },
});