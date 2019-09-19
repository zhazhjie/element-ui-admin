export default{
  data(){
    return{
      
    }
  },
  methods: {

  },
  filters: {
    formatMobile: function(value) {
      if (!value) return '***';
      value = value.substr(0,3)+"****"+value.substr(7);
      return value;
    },
  },
}
