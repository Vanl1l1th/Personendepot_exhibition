

 window.onload = function() {
   var lastPos=0;
   var path = window.location.pathname;

       $(window).on('popstate', function() {
          if(window.location.pathname=="/"){
            handleScroll(lastPos);
          }
       });


   document.addEventListener('scroll',function(){
     if(window.location.pathname==="/"){
       lastPos=window.scrollY;
     }
   })

   function handleScroll(pos){
     setTimeout(function(){
     window.scrollTo(0,pos);
   }, 400);
   }


//    var path = window.location.pathname;
//


   (function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
      //console.log(lastPos);
      // YOUR CUSTOM HOOK / FUNCTION
      var pathname=arguments[2];
      if(pathname=="/"){
          handleScroll(lastPos);
      }
      if(pathname==="/dropoff" || pathname==="/create" || pathname.substring(0,7)=="/profil"){
        document.body.style.backgroundColor = "#E5E5E5";
        $( ".topnav" ).css( "backgroundColor", "white" );

      }else if(pathname.substring(0,8)=="/product"||pathname.substring(0,7)=="/person"){
          document.body.style.backgroundColor = "#7D7D7D";
          $( ".topnav" ).css( "backgroundColor", "#7D7D7D" );
      }else{
        document.body.style.backgroundColor = "white";
        $( ".topnav" ).css( "backgroundColor", "white" );
      }

      return pushState.apply(history, arguments);
    };
})(window.history);

 };
