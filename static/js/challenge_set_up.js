new Vue({
    el: '#challenge_set_up',
    data: {
        user: {},
        mode: '',
        selected: 'alcohol',
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
            $('#selected_dependency').attr('src', '../static/img/' + this.selected + '.png')
        },
        getUser: function() {
            this.$http.post('/json/user/' + this.user['id'])
        },
        selectDependency: function(dependency){
            this.selected = dependency;
            this.getImage();
            $('#select_dependency_modal').modal('hide')
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