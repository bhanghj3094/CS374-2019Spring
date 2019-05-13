new Vue ({
    el: '#enroll',
    data: {
        user: {}
    },
    mounted: null,
    methods: {
        sendUserInfo: function(){
            this.$http.post('/send_user_info', {'user_info': this.user})
            .then(response => {
            console.log(response)
          }, error => {
            console.log(error)
          });
        }
    }


})