new Vue ({
    el: '#main',
    data: {
        user: {},
        temp: ""
    },
    mounted: function () {
    }
    ,
    methods: {
        validation: function (user){
            if(((String)session.getAttribute("id"))==null){
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
        }
    }
});