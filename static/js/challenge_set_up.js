new Vue({
    el: '#challenge_set_up',
    data: {
        user: {},
        dependency: 'alcohol',
        spent_money: 10000,
        spent_per: 'day',

    },
    mounted: function (){
        this.$http.get('user_info').then(response => {
            this.user = response.data;
        })
        var dependencyImage = '@/img/alcohol.png';
        console.log(dependencyImage);

    },
    computed: {
    },
    methods: {
        getImage: function(){
            dependencyImage: '../img/alcohol.png'
        }

    }

})