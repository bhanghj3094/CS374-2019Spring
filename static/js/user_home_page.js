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
  data() {
    return {
      username: "HyoungJo", // 처음엔 비어있어야함
      time_left: "3 Days 12:3:24", // 처음엔 비어있어야함
      end_time: "May 21th, 2019 18:00", // 처음엔 비어있어야함
      complete_percentage: 0,
      dropdownText: "None", // 이거는 Share on SNS 할 때 필요
      user_goals: ["0.1 iPad", "12 Americanos", "0.01 Paris Trip"], // 처음엔 비어있어야함
      cheerings: [
        { 'message': 'You Can Do This!', 'friendName': 'userID1234'},
        { 'message': 'Only three more days to go!', 'friendName': 'userID5678'}
      ],
      num_of_tokens: 2, //
    }
  },
  methods: {
    changeDropdown: function (content) {
      this.dropdownText = content;
      // 이건 이미 작동하는 함수.
    },
    tickClockTimer: function () {
      // subtract one second from time_left.
      this.time_left = current-1;
    },
    shareOnSNS: function (feature_for_sharing) {
      axios.post("서버로~")
        .then(res => {
          // res.status 가 정상 200인지만 확인
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

    axios.get("to our flask") // 수연누나
      .then(res => {
        /* ===== Header ===== */
        // bring name and change username variable
        this.username = "";

        // bring start date, end date
        // => calculate time_left and draw the bar.
        this.time_left = ""; // 3 Days 12:3:24
        this.end_time = ""; // May 21th, 2019 18:00 이런 꼴로 만들어서 넣어라
        this.complete_percentage = (time_left/(end-start)) * 100;

        // => tick the clock timer
        setInterval(tickClockTimer, 1000);


        // bring user daily uses, and user goal items
        const totalSavedMoney = 34300; // 유저가 입력한 소비패턴으로, 현재까지 모은 돈을 계산한다.
        // saved money 나누기 각 항목 후 그 숫자를 앞에 붙여서 user_goals 에 차례로 넣기
        // { 'iPad': '340,000', 'Americano': '2,000', 'Paris Trip': '3,500,000'}


        // bring cheerings from friends
        // DB 파싱해서 위에 cheerings 넣기

      })
      .catch(err => console.log(err));
  },
});