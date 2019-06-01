new Vue ({
    el: '#enroll',
    data: {
        user: {}
    },
    mounted: function () {
    }
    ,
    methods: {
        validation: function (user) {
            if (!user['id'] || !user['nickname'] || !user['password'] || !user['password_verify']){
                alert('Fill in all information!');
                return false;
            } else if (user['id'].length > 20) {
                alert('ID is too long!');
                return false;
            } else if (user['nickname'].length > 20) {
                alert('NickName is too long!');
                return false;
            } else if (user['password'] != user['password_verify']) {
                alert('Re-Type password is different with password.');
                return false;
            } else if((user['email'] != null) && !user['email'].includes('@')){
                alert('Please enter a valid email.')
                return false;
            } else {
                return true;
            }
        },
        sendUserInfo: function() {
            if (this.validation(this.user)){
                document.getElementById('enroll_form').submit();
            }
        }
    }
});
