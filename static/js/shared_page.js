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

/* ===== countdown timer javascript ===== */
let target_date = new Date().getTime() + (1000*3600*48); // set the countdown date
let days, hours, minutes, seconds; // variables for time units

getCountdown();
setInterval(function () { getCountdown(); }, 1000);

function getCountdown(){
  console.log("counting..");
  // find the amount of "seconds" between now and target
  let current_date = new Date().getTime();
  let seconds_left = (target_date - current_date) / 1000;

  days = pad( parseInt(seconds_left / 86400) );
  seconds_left = seconds_left % 86400;
  hours = pad( parseInt(seconds_left / 3600) );
  seconds_left = seconds_left % 3600;
  minutes = pad( parseInt(seconds_left / 60) );
  seconds = pad( parseInt( seconds_left % 60 ) );

  // format countdown string + set tag value
  document.getElementById("tiles").innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
}

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}


new Vue({
  el: "#sharedPageBodyWrapper",
  name: "shared_page_vue",
  data() {
    return {
      username: "HyoungJo",
      end_time: "May 21th, 2019 18:00",
      user_goals: [],
    }
  },
  methods: {

  },
  created() {
    console.log("shared_page js loaded")
  }
});