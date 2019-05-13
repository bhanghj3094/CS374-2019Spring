new Vue ({
    el: '#enroll',
    data: {
        user: {},
        temp: ""
    },
    mounted: function () {
    }
    ,
    methods: {
        validation: function (user) {
            if (!user['user_id'] || !user['user_password'] || !user['user_password_verify'] || !user['user_email']){
                alert('Fill in all information!');
                return false;
            } else if (user['user_id'].length > 20){
                alert('User ID is too long!');
                return false;
            } else if (user['user_password'] != user['user_password_verify']){
                alert('Re-Type password is different with password');
                return false;
            } else {
                return true;
            }
        },
        sendUserInfo: function(){
            if (this.validation(this.user)){
                temp = document.createElement('user_info');
                temp.innerHTML = this.user;

                document.getElementById('enroll_form').submit();
            }
        }
    }
});
