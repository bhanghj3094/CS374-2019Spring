new Vue({
    el: '#rock_scissor_paper',
    data: {
        myChoice: null,
        comChoice: null,
        count: 3,
        winner: null,
        lifeOfMe: 3,
        lifeOfCom: 3,
        isSelectable: true,
        logs:[],
        selects:[
            { name: 'Scissor', value: 'scissor'},
            { name: 'Rock', value: 'rock'},
            { name: 'Paper', value: 'paper'},
        ]
    },
    computed: {
        myChoiceImg: function () {
            return this.myChoice !== null ? `../static/img/${this.myChoice}.jpg` : '../static/img/question.jpg'
        },
        comChoiceImg: function () {
            return this.comChoice !== null ? `../static/img/${this.comChoice}.jpg` : '../static/img/question.jpg'
        },
        leftLifeOfMe: function () {
            return 3 - this.lifeOfMe
        },
        leftLifeOfCom: function () {
            return 3 - this.lifeOfCom
        }
    },
    watch: {
        count: function (newVal) {
            if(newVal === 0){
                // 컴퓨터가 가위바위보를 선택하는
                this.selectCom()

                // 가위바위보 승패 결정 & 몫을 차감
                this.whoIsWin()

                // 게임 리셋
                this.count = 3
                this.isSelectable = true

                // 로그를 업데이트 하는 부분
                this.updateLogs()
            }
        },
        lifeOfMe: function(newVal) {
            if(newVal === 0){
                // 게임을 종료
                this.endGame('Sorry, you fail to acquire a token.')
            }
        },
        lifeOfCom: function(newVal) {
            if(newVal === 0){
                this.endGame('Congratulations! You have acquired a token!')
            }
        }
    },
    methods: {
        startGame: function () {
            // 버튼이 보이지 않음
            this.isSelectable = false
            if(this.myChoice === null){
                alert('Make a choice!')
                this.isSelectable = true
            } else {
                let countDown = setInterval(()=> {
                    this.count --
                    if(this.count === 0){
                        clearInterval(countDown)
                    }
                }, 1000)
            }
        },
        selectCom: function () {
            let number = Math.random()
                if(number < 0.33){
                    this.comChoice = 'scissor'
                } else if(number < 0.66){
                    this.comChoice = 'rock'
                } else {
                    this.comChoice = 'paper'
                }
        },
        whoIsWin: function () {
            if(this.myChoice === this.comChoice) this.winner = 'no one'
            else if(this.myChoice === 'rock' &&  this.comChoice === 'scissor') this.winner = 'me'
            else if(this.myChoice === 'scissor' &&  this.comChoice === 'paper') this.winner = 'me'
            else if(this.myChoice === 'paper' &&  this.comChoice === 'rock') this.winner = 'me'
            else if(this.myChoice === 'scissor' &&  this.comChoice === 'rock') this.winner = 'com'
            else if(this.myChoice === 'paper' &&  this.comChoice === 'scissor') this.winner = 'com'
            else if(this.myChoice === 'rock' &&  this.comChoice === 'paper') this.winner = 'com'
            else this.winner = 'error'

            // 몫 차감
            if(this.winner === 'me') {
                this.lifeOfCom --
            }
            else if(this.winner === 'com'){
                this.lifeOfMe --
            }
        },
        updateLogs: function () {
            let log = {
                messege: `You: ${this.myChoice}, Computer: ${this.comChoice}`,
                winner: this.winner
            }

            this.logs.unshift(log)
        },
        endGame: function (msg) {
            setTimeout(() => {
                confirm(msg)
                location.href='../../templates/user_home_page';
                this.lifeOfMe = 3
                this.lifeOfCom = 3
                this.myChoice = null
                this.comChoice = null
                this.winner = null
                this.logs =[]
            }, 1)
        }
    }
})
