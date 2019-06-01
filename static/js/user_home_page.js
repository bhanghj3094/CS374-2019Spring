$('#popup').modal('show');

new Vue({
  el: "#userHomeBodyWrapper",
  name: "user_home_page_vue",
  data: {
    user: {},
    userid: "HyoungJo", // It is empty at first.
    postUrl: "http://54.180.181.191:5000/shared_page",
    postText: [
      { 'theme': 'None', 'message': 'Check your '+this.userid+' challenge'},
      { 'theme': 'Pokings', 'message': 'Poke for ' +this.userid},
      { 'theme': 'Bettings', 'message': 'Bet on '+this.userid},
      { 'theme': 'Posters', 'message': 'Do you wonder ' +this.userid + 'future?'},
    ],
    postingText: 'Check your '+this.userid+' challenge',
    time_left: "", // It is empty at first.
    print_time_left: "", // It is empty at first.
    print_end_time: "", // It is empty at first.
    start_time: new Date("2019-05-20T09:00:00"), // It is empty at first.
    end_time: new Date("2019-06-08T23:59:59"), // It is empty at first.
    complete_percentage: 0,
    dropdownText: "None", // It needs to share on SNS
    user_goals: [],
    goals: [
      {'name': 'iPad', 'money': 1000000},
      {'name': 'Americano', 'money': 5000},
      {'name': 'Paris Trip', 'money': 4000000},
    ], // It is empty at first.
    cheerings: [
      { 'message': 'You Can Do This!', 'friendName': 'David' },
      { 'message': 'Only five more days to go!', 'friendName': 'Christina' },
      { 'message': 'Cheer up!!', 'friendName': 'James' },
      { 'message': 'Anything is possible', 'friendName': 'Scott' },
      { 'message': 'Server Error', 'friendName': 'Elice' },
      { 'message': 'Little more..', 'friendName': 'Susan' },
    ],
    user_reports: [
      { 'reportImage': 'NONE', 'reportMessage': 'Great job so far!' },
      { 'reportImage': 'Oh no', 'reportMessage': 'I saw you in Guno!' },
    ],
    spent_money: 10000, // It is empty at first.
    print_saved_money: 0,
    spent_per: "Day", // It is empty at first.
    spent_money_ms: 0, // It is empty at first.
    saved_money: "", // It is empty at first.
    num_of_tokens: 2, // tokens for soft_failure
  },
  created() {
    if(this.spent_per == "Day")
      this.spent_money_ms = this.spent_money / 86400000;
    else if(this.spent_per == "Week")
      this.spent_money_ms = this.spent_moeny / (86400000 * 7);
    else if(this.spent_per == "Month")
      this.spent_money_ms = this.spent_money / (86400000 * 7 * 30);
  },
  mounted: function() {
    /*this.getUser().then(function(response){
      this.user = response.data;
    });*/

    this.goalView();
    this.print_end_time = this.getTimeStamp(this.end_time);
    // Update the count down every 1 second
    this.timerCount();
    this.interval = setInterval(() => {
        this.timerCount(this.start,this.end);
    }, 1000);
  },
  methods: {
    getTimeStamp: function(date) {
      console.log("getTimeStamp");
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

      for (i = 0; i < digits - n.length; i++)
          zero += '0';
      return zero + n;
    },
    moneyCount: function(start,now){
      var calc_saved_money = (now - start) * this.spent_money_ms;
      this.saved_money = calc_saved_money.toFixed(2);
      this.print_saved_money = this.numberWithCommas(this.saved_money);
    },
    numberWithCommas: function(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    timerCount: function(){
        // Get todays date and time
        var start = this.start_time;
        var end = this.end_time;
        var now = new Date();

        // Find the distance between now an the count down date
        this.time_left = end - now;
        this.print_time_left = this.calcTime(this.time_left);
        var percent = (now - start) / (end - start) * 100;
        if (percent > 100)percent = 100;
        this.complete_percentage = percent.toFixed(4);
        this.goalView();
        this.moneyCount(start,now);
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
    /*getUser: function() {
        this.$http.get('/json/user/' + this.user['id'])
    },*/
    init: function () {
      this.userid = this.user["user_id"];
      this.end_time = this.user["goal_date"];
      this.timerCount();
      this.user_goals = [this.user["mini_goal_1"], this.user["mini_goal_2"], this.user["mini_goal_3"]];
    },
    changeDropdown: function (content) {
      this.dropdownText = content;
      this.postingText = this.postText.find(function(element) {
        return element.theme == content;
      })['message'];
      // already run
    },
    shareOnFacebook: function () {
      var url = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(this.postUrl) + "&t=" + encodeURIComponent( this.postingText );
      window.open(url, 600, 450);
      /*axios.post("server~")
        .then(res => {
          // Check res.status is 200
        })
        .catch(err => console.log(err));*/
    },
    shareOnTwitter: function () {
      var url = "http://twitter.com/intent/tweet?text=" + encodeURIComponent( this.postingText ) + "&url=" + encodeURIComponent(this.postUrl);
		  window.open(url, 600, 450);
    },
    soft_failure: function (tokens) {
      location.href='../../templates/rock_scissor_paper';
    },
    goalView: function(){
      this.user_goals = [];
      for (var i = 0 ; i < this.goals.length ; i++){
        var value = (this.saved_money/this.goals[i]['money']).toFixed(2);
        this.user_goals.push( value + " " + this.goals[i]['name']);
      }
    },
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
