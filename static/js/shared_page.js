new Vue({
  el: "#sharedPageBodyWrapper",
  name: "shared_page_vue",
  data: {
    user: {},
    userid: "WooSik", // It is empty at first.
    time_left: "", // It is empty at first.
    print_end_time: "", // It is empty at first.
    start_time: new Date("2019-05-20T09:00:00"), // It is empty at first.
    end_time: new Date("2019-06-24T23:59:59"), // It is empty at first.
    complete_percentage: 0,
    image: '',
    report_text: "",
    reports: [],
    cheeringMessage: '',
    cheeringFriendName: '',
    cheeringMessageList: [],
    pokingFriendName: '',
    pokingList: [
      {'pokingFriendName': 'Jason', 'numberOfPoking': 34},
      {'pokingFriendName': 'Christina', 'numberOfPoking': 26},
      {'pokingFriendName': 'Hyeongshin', 'numberOfPoking': 20},
      {'pokingFriendName': 'Jinwon', 'numberOfPoking': 14},
      {'pokingFriendName': 'Suyeon', 'numberOfPoking': 9},
    ],
    bettingSide: '',
    bettingFriendName: '',
    bettingAmount: '',
    succeedBettingList: [
      {'bettingAmount': 20000, 'bettingFriendName': 'Simon'},
      {'bettingAmount': 15000, 'bettingFriendName': 'James'},
    ],
    failureBettingList: [
      {'bettingAmount': 26000, 'bettingFriendName': 'James'},
      {'bettingAmount': 21000, 'bettingFriendName': 'James'},
      {'bettingAmount': 10000, 'bettingFriendName': 'Simon'},
    ],
    succeed_bets_money: 35000,
    failure_bets_money: 57000,
  },
  mounted() {
    this.pokeView();
    this.betView();
    this.print_end_time = this.getTimeStamp(this.end_time);
    // Update the count down every 1 second
    this.timerCount();
    this.interval = setInterval(() => {
        this.timerCount(this.start,this.end);
    }, 1000);
    this.changeBettingBar();
  },
  methods: {
    getUser: function() {
      this.$http.post('/json/user/' + this.user['id'])
      // bring name and change username variable
      this.userid = this.user["nickname"];
      var now = new Date().getTime();
      this.time_left = this.user["goal_date"] - now;
      this.end_time = this.user["goal_date"];
      var percent = this.time_left / (this.user["goal_date"] - this.user["start_date"]);
      this.complete_percentage = percent * 100;
    },
    updateUser: function () {
      this.$http.post('/update_user', this.user)
      .then(
        alert('user information is updated')
      )
    },
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
      this.saved_money = calc_saved_money.toFixed(2);
      this.print_saved_money = this.numberWithCommas(this.saved_money);
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
        if (percent > 100)percent = 100;
        this.complete_percentage = percent.toFixed(2);
        $("#dynamic")
        .css("width", this.complete_percentage + "%")
        .attr("aria-valuenow", this.complete_percentage)
        .text(this.complete_percentage + "% Complete");
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
    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage: function(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    },
    vaildReport: function () {
      if (!this.image){
        alert('Please attach image!');
        return false;
      }
      else {
        alert('Report Success!');
        return true;
      }
    },
    submitReport: function (e){
      if (this.vaildReport()){
        this.reports.push({'image': this.image, 'text': this.report_text});
        this.image = '';
        this.report_text = "";
      }
    },
    sendCheeringMessage: function(e) {
      if (!this.cheeringMessage) {
        alert("Please fill in the message");
        return;
      }
      if (!this.cheeringFriendName) {
        this.cheeringFriendName = 'friendNoName';
      }
      this.cheeringMessageList.push({'cheeringMessage': this.cheeringMessage, 'cheeringFriendName': this.cheeringFriendName});
      this.cheeringMessage = "";
      this.cheeringFriendName = "";
      alert("Message Successfully Sent!");
    },
    pokeView: function() {
        $('#pokeTable tr').remove();
            var poke = $('#pokeTable');
        if (this.pokingList){
          for (var i = 0 ; i < this.pokingList.length ; i++) {
            var newRow = $("<tr></tr>");
            var newIndex = $(`<th scope="row">${i+1}</th>`);
            var newNumber = $(`<td>${this.pokingList[i]['numberOfPoking']}</td>`);
            var newName = $(`<td>${this.pokingList[i]['pokingFriendName']}</td>`);
            newRow.append([newIndex, newNumber, newName]);
            newRow.appendTo(poke);
          }
        }
    },
    onPoking: function(e) {
      if (!this.pokingFriendName) {
        alert("Please fill in your name!");
        return;
      }
      var index = this.pokingList.findIndex(x => x.pokingFriendName == this.pokingFriendName);
      if (index != -1) {
        this.pokingList[index]['numberOfPoking'] += 1;
      } else {
        this.pokingList.push({'pokingFriendName': this.pokingFriendName, 'numberOfPoking': 1});
      }
      this.pokingList.sort(function(a, b) {
          return b['numberOfPoking'] - a['numberOfPoking'];
      });
      this.pokeView();
      this.pokingFriendName = "";
      alert("You Poked Your Friend!");
    },
    betView: function() {
        $('#succeedBet tr').remove();
        var sb = $('#succeedBet');
        $('#failureBet tr').remove();
        var fb = $('#failureBet');
        if (this.succeedBettingList){
          for (var i = 0 ; i < this.succeedBettingList.length ; i++) {
            var newRow = $("<tr></tr>");
            var newNumber = $(`<td>${'₩'+ this.numberWithCommas(this.succeedBettingList[i]['bettingAmount'])}</td>`);
            var newName = $(`<td>${this.succeedBettingList[i]['bettingFriendName']}</td>`);
            newRow.append([newNumber, newName]);
            newRow.appendTo(sb);
          }
        }
        if (this.failureBettingList){
          for (var i = 0 ; i < this.failureBettingList.length ; i++) {
            var newRow = $("<tr></tr>");
            var newNumber = $(`<td>${'₩'+ this.numberWithCommas(this.failureBettingList[i]['bettingAmount'])}</td>`);
            var newName = $(`<td>${this.failureBettingList[i]['bettingFriendName']}</td>`);
            newRow.append([newNumber, newName]);
            newRow.appendTo(fb);
          }
        }
    },
    onBetting: function(e) {
      if (!(this.bettingFriendName && this.bettingAmount && this.bettingSide)) {        //this.bettingSide &&
        alert("Please fill all the information, and choose which side to bet");
        return;
      }
      if (this.bettingSide == 'WillSucceed'){
        alert("Bet Successful: " + Number(this.bettingAmount) + " won to " + this.bettingFriendName + " will succeed!!");
        this.succeed_bets_money += Number(this.bettingAmount);
        var index = this.succeedBettingList.findIndex(x => x.bettingFriendName == this.bettingFriendName);
        if (index != -1) {
          this.succeedBettingList[index]['bettingAmount'] += this.bettingAmount;
        } else {
          this.succeedBettingList.push({'bettingFriendName': this.bettingFriendName,
                                        'bettingAmount': this.bettingAmount});
        }
        this.succeedBettingList.sort(function(a, b) {
            return b['bettingAmount'] - a['bettingAmount'];
        });
      }
      else {
        alert("Bet Successful: " + Number(this.bettingAmount) + " won to " + this.bettingFriendName + " will fail!!");
        this.failure_bets_money += Number(this.bettingAmount);

        var index = this.failureBettingList.findIndex(x => x.bettingFriendName == this.bettingFriendName);
        if (index != -1) {
          this.failureBettingList[index]['bettingAmount'] += this.bettingAmount;
        } else {
          this.failureBettingList.push({'bettingFriendName': this.bettingFriendName,
                                       'bettingAmount': this.bettingAmount});
        }
        this.failureBettingList.sort(function(a, b) {
            return b['bettingAmount'] - a['bettingAmount'];
        });
      }

      this.betView();
      this.bettingFriendName = "";
      this.bettingAmount = "";
      this.bettingSide = "";
    },
    changeBettingBar: function () {
      var elem = document.getElementById("betting_dynamic");
      var succeed_bets_money_percent = this.succeed_bets_money / (this.succeed_bets_money + this.failure_bets_money) * 100;
      elem.style.width = succeed_bets_money_percent + '%';
    },
    numberWithCommas: function(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
});
