new Vue ({
    el: '#main',
    data: {
        user: {},
    },
    mounted: function () {
    },
    methods: {
        validation: function (user){
            if(!user['id']){
                response.sendRedirect("login");
                return false;
            } else {
                return true;
            }

        },

        goToUser: function(){
             if (this.validation(this.user)){
                 location.href='../../templates/user_home_page';
             }
        },
        enroll: function() {
            location.href='../../templates/enroll';
        }
    }
});
