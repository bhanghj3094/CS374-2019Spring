
new Vue({
  el: "#userHomeBodyWrapper",
  name: "user_home_page_vue",
  data: function() {
    return{
      /*userid: "",
      user: {},
      time_left: "",
      end_time: "",
      complete_percentage: "",
      dropdownText: "None",
      user_goals: [],
      cheerings: [
        { 'message': 'You Can Do This!', 'friendName': 'userID1234'},
        { 'message': 'Only three more days to go!', 'friendName': 'userID5678'},
      ],*/
      userid: "HyoungJo", // It is empty at first.
      time_left: "", // It is empty at first.
      print_time_left: "", // It is empty at first.
      print_end_time: "", // It is empty at first.
      start_time: new Date("2019-05-10T09:00:00"), // It is empty at first.
      end_time: new Date("2019-06-01T11:00:00"), // It is empty at first.
      complete_percentage: 0,
      dropdownText: "None", // It needs to share on SNS
      user_goals: ["0.1 iPad", "12 Americanos", "0.01 Paris Trip"], // It is empty at first.
      cheerings: [
        { 'message': 'You Can Do This!', 'friendName': 'userID1234'},
        { 'message': 'Only three more days to go!', 'friendName': 'userID5678'}
      ],
      num_of_tokens: 2, //
    };
  },
  mounted() {
    // this.getUser();
    this.print_end_time = this.getTimeStamp(this.end_time);
    // Update the count down every 1 second
    this.timerCount(this.start_time,this.end_time);
    this.interval = setInterval(() => {
        this.timerCount(this.start,this.end);
    }, 1000);
  },
  methods: {
    getTimeStamp: function(date) {
      var s =
        this.leadingZeros(date.getFullYear(), 4) + '-' +
        this.leadingZeros(date.getMonth() + 1, 2) + '-' +
        this.leadingZeros(date.getDate(), 2) + ' ' +

        this.leadingZeros(date.getHours(), 2) + ':' +
        this.leadingZeros(date.getMinutes(), 2) + ':' +
        this.leadingZeros(date.getSeconds(), 2);

      return s;
    },
    leadingZeros: function(n, digits) {
      var zero = '';
      n = n.toString();

      if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
          zero += '0';
      }
      return zero + n;
    },
    timerCount: function(start,end){
        // Get todays date and time
        var now = new Date();

        // Find the distance between now an the count down date
        this.time_left = this.end_time - now;
        this.print_time_left = this.calcTime(this.time_left);
        var percent = (now - this.start_time) / (this.end_time - this.start_time) * 100;
        this.complete_percentage = percent.toFixed(4);
        $("#dynamic")
        .css("width", this.complete_percentage + "%")
        .attr("aria-valuenow", this.complete_percentage)
        .text(this.complete_percentage + "% Complete");
    },
    calcTime: function(dist){
      // Time calculations for days, hours, minutes and seconds
        this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
        return this.days + " days " + this.hours + " h " + this.minutes + " m " + this.seconds + " s";
    },
    /*getUser: function () {
        this.$http.get('user_info').then(function (response) {
            this.user = response.data;
        });
        init();
    },*/
    init: function () {
      this.userid = this.user["user_id"];
      this.end_time = this.user["goal_date"];
      this.timerCount();
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
      axios.post("server~")
        .then(res => {
          // Check res.status is 200
        })
        .catch(err => console.log(err));
    },
    soft_failure: function (tokens) {

      // random redirect!
      location.href='../../templates/rock_scissor_paper.html';
    }

  },
  /*
  created() {
    console.log("user_home_page js loaded");

    axios.get('user_info') // suyeon
      .then(res => {
        /* ===== Header ===== */
        // bring name and change username variable
        /* console.log("hello");
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
  },*/
});
