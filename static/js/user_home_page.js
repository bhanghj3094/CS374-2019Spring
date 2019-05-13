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
  el: "#userHomeBodyWrapper",
  name: "user_home_page_vue",
  data: function() {
    return{
      userid: "",
      user: {},
      time_left: "",
      end_time: "",
      complete_percentage: "",
      dropdownText: "None",
      user_goals: [],
      cheerings: [
        { 'message': 'You Can Do This!', 'friendName': 'userID1234'},
        { 'message': 'Only three more days to go!', 'friendName': 'userID5678'},
      ],
      /*
      userid: "HyoungJo", // It is empty at first.
      time_left: "3 Days 12:3:24", // It is empty at first.
      end_time: "May 21th, 2019 18:00", // It is empty at first.
      complete_percentage: 0,
      dropdownText: "None", // It needs to share on SNS
      user_goals: ["0.1 iPad", "12 Americanos", "0.01 Paris Trip"], // It is empty at first.
      cheerings: [
        { 'message': 'You Can Do This!', 'friendName': 'userID1234'},
        { 'message': 'Only three more days to go!', 'friendName': 'userID5678'}
      ],
      num_of_tokens: 2, //
    };*/
  },
  mounted() {
    this.getUser();
    this.end = new Date(this.end_time).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start,this.end);
    this.interval = setInterval(() => {
        this.timerCount(this.start,this.end);
    }, 1000);
  },
  methods: {
    getUser: function () {
        this.$http.get('user_info').then(function (response) {
            this.user = response.data;
        });
        init();
    },
    init: function () {
      console.log("hello");
      this.userid = this.user["user_id"];
      var now = new Date().getTime();
      this.time_left = this.user["goal_date"] - now;
      this.end_time = this.user["goal_date"];
      var percent = this.time_left / (this.user["goal_date"] - this.user["start_date"]);
      this.complete_percentage = percent;
      this.user_goals = [this.user["mini_goal_1"], this.user["mini_goal_2"], this.user["mini_goal_3"]];
    },
    changeDropdown: function (content) {
      this.dropdownText = content;
      // already run
    },
    tickClockTimer: function () {
      // subtract one second from time_left.
      this.time_left = current-1;
    },
    shareOnSNS: function (feature_for_sharing) {
      axios.post("서버로~")
        .then(res => {
          // Check res.status is 200
        })
        .catch(err => console.log(err));
    },
    soft_failure: function (tokens) {

      // 여기서 원래 random 으로 redirect!
      location.href='../../templates/rock_scissor_paper.html';
    }

  },
  created() {
    console.log("user_home_page js loaded");

    axios.get('user_info') // suyeon
      .then(res => {
        /* ===== Header ===== */
        // bring name and change username variable
        console.log("hello");
        this.userid = this.user["user_id"];
        var now = new Date().getTime();
        this.time_left = this.user["goal_date"] - now;
        this.end_time = this.user["goal_date"];
        var percent = this.time_left / (this.user["goal_date"] - this.user["start_date"]);
        this.complete_percentage = percent * 100;
        this.user_goals = [this.user["mini_goal_1"], this.user["mini_goal_2"], this.user["mini_goal_3"]];
        this.username = "";

        // bring start date, end date
        // => calculate time_left and draw the bar.
        // this.time_left = ""; // 3 Days 12:3:24
        // this.end_time = ""; // May 21th, 2019 18:00
        // this.complete_percentage = (time_left/(end-start)) * 100;

        // => tick the clock timer
        setInterval(tickClockTimer, 1000);


        // bring user daily uses, and user goal items
        const totalSavedMoney = 34300; // Calculate money collected to now for user's consumption pattern
        // saved money division by respective item and then input user_goals
        // { 'iPad': '340,000', 'Americano': '2,000', 'Paris Trip': '3,500,000'}


        // bring cheerings from friends
        // DB farthing and put in cheerings

      })
      .catch(err => console.log(err));
  },
});
