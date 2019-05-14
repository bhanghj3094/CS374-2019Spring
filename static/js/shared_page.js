new Vue({
  el: "#sharedPageBodyWrapper",
  name: "shared_page_vue",
  data() {
    return {
      username: "HyoungJo", // It is empty at first.
      time_left: "", // It is empty at first.
      print_end_time: "", // It is empty at first.
      start_time: new Date("2019-05-10T09:00:00"), // It is empty at first.
      end_time: new Date("2019-06-01T11:00:00"), // It is empty at first.
      complete_percentage: 0,
      user_goals: ["0.1 iPad", "12 Americanos", "0.01 Paris Trip"], // It is empty at first.
      spent_money: 10000, // It is empty at first.
      spent_per: "Day", // It is empty at first.
      spent_money_ms: 0, // It is empty at first.
      saved_money: "", // It is empty at first.
    }
  },
  methods: {

  },
  created() {
    if(this.spent_per == "Day")
      this.spent_money_ms = this.spent_money / 86400000;
    else if(this.spent_per == "Week")
      this.spent_money_ms = this.spent_moeny / (86400000 * 7);
    else if(this.spent_per == "Month")
      this.spent_money_ms = this.spent_money / (86400000 * 7 * 30);
  },
  mounted() {
    // this.getUser();
    this.print_end_time = this.getTimeStamp(this.end_time);
    // Update the count down every 1 second
    this.timerCount();
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
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
      return zero + n;
    },
    moneyCount: function(start,now){
      var calc_saved_money = (now - start) * this.spent_money_ms;
      this.saved_money = this.numberWithCommas(calc_saved_money.toFixed(2));
    },
    timerCount: function(){
        // Get todays date and time
        var start = this.start_time;
        var end = this.end_time;
        var now = new Date();
        // Find the distance between now an the count down date
        this.time_left = end - now;
        this.getCountdown();
        this.moneyCount(start,now);
        var percent = (now - start) / (end - start) * 100;
        this.complete_percentage = percent.toFixed(4);
        $("#dynamic")
        .css("width", this.complete_percentage + "%")
        .attr("aria-valuenow", this.complete_percentage)
        .text(this.complete_percentage + "% Complete");
    },
    numberWithCommas: function(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getCountdown: function(){
      // find the amount of "seconds" between now and target
      var current_date = new Date();
      var seconds_left = (this.end_time - current_date) / 1000;

      var days = this.leadingZeros( parseInt(seconds_left / 86400) );
      seconds_left = seconds_left % 86400;
      var hours = this.leadingZeros( parseInt(seconds_left / 3600) );
      seconds_left = seconds_left % 3600;
      var minutes = this.leadingZeros( parseInt(seconds_left / 60) );
      var seconds = this.leadingZeros( parseInt( seconds_left % 60 ) );

      // format countdown string + set tag value
      document.getElementById("tiles").innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
    },
  },
});