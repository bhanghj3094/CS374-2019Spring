new Vue({
    el: '#challenge_set_up',
    data: {
        user: {},
        mode: '',
        dependency: 'alcohol',
        spent_money: 10000,
        spent_per: 'day'
    },
    mounted: function (){
        this.getImage();
        this.mode = mode;
        if (mode === 'create'){
            this.user = user_info;

        } else {
            this.getUser().then(function(response){
                this.user = response.data;
            })
        }

    },
    methods: {
        getImage: function() {
            $('#dependency_image').attr('src', '../static/img/' + this.dependency + '.png')
        },
        getUser: function() {
            this.$http.post('/json/user/' + this.user['id'])
        },
        createUser: function () {
            this.$http.post('/create_user', this.user)
                .then(
                    alert('user is created')
                )
        },
        updateUser: function () {
            this.$http.post('/update_user', this.user)
                .then(
                    alert('user information is updated')
                )
        }

    }

})