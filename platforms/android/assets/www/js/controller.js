/**
 demo.js
 This provides the model and controller for the clock list app!
 It is written entirely in JavaScript with no use of AngularJS
 but it does just jQuery to handle the ajax calls in a browser independent manner...
 and it uses jQuery to access and modify the HTML file index.html
 
 VERSION 1.0.1 -- here is where we start adding some functionality
 **/

var clockApp = (function($) {


    // first create the model
    var myList = new ClockList();

    var showView = function(selected) {
      window.location.hash = '#' + selected;
      $('.view').hide().filter('#' + selected + '-view').show();
    };
  
    function handleDeletealarm(element) {
        console.log("deleting alarm");
        console.log(" with id " + element.getAttribute("sid"));
        myList.deleteElement(element.getAttribute("sid"));

    }


    
    function playAudio() {
    // Play the audio file at url
        var my_media = new Media("/Desktop/JBS2014/Git_JBS/YoWakeUp/www/chenxing_final_001.wav",
        // success callback
        function () { console.log("playAudio():Audio Success"); },
        // error callback
        function (err) { console.log("playAudio():Audio Error: " + err); }
    );

    // Play audio
    my_media.play();
    }

    function addalarm() {


        myList.addElement({
            time: "",
            status: true,
            description: ""
        });

    }

    function editTime(element){
        var alarmId = element.getAttribute("sid");
        var alarmVal = element.value;
        var alarm;
        console.log("alarm "+alarmId+" has value "+alarmVal);
        alarm = myList.getElement(alarmId);
        alarm.time = alarmVal;
        myList.updateElement(alarm.id,alarm);
        refreshView();
        
    }
    
    function editstatus(element){
        var alarmId = element.getAttribute("sid");
        var statusCheckbox = document.getElementById('changestatus'+alarmId);
        var alarm;
      
        alarm = myList.getElement(alarmId);
        if(!alarm.status){
            console.log("it was unchecked");
            alarm.status = true;
        } else {
            console.log("it was checked");
            alarm.status = false;
        }
        console.log("alarm "+alarmId+" changing its status to "+alarm.status);
        myList.updateElement(alarm.id,alarm);
        refreshView();
    }
    
    function editDes(element){
        var alarmId = element.getAttribute("sid");
        var alarmVal = element.value;
        var alarm;
        console.log("alarm "+alarmId+" has value "+alarmVal);
        alarm = myList.getElement(alarmId);
        alarm.description = alarmVal;
        myList.updateElement(alarm.id,alarm);
        refreshView();
        
    }

 

    function editalarm(element) {
        console.log("editing alarm "+element.getAttribute("sid"));
    }

    function refreshView(){
        clockView.refreshView(myList);
    }

    function reloadModel(){
        myList.loadModel();
        refreshView();
    }
    
    function initEventListeners(){
        $(window).on('hashchange', function(event){
          var view = (window.location.hash || '').replace(/^#/, '');
          if ($('#' + view + '-view').length) {
            showView(view);
          }
        });
    }

    function start() {
        myList.loadModel();
        console.log("myList = " + JSON.stringify(myList));
        clockView.refreshView(myList);
        showView("welcome");


    }

    // here is were we decide what is visible to the outside!
    clockApp = {
        start: start,
        addalarm: addalarm,
        handleDeletealarm: handleDeletealarm,
        refreshView: refreshView,
        
        editalarm: editalarm,
        reloadModel: reloadModel,
        editTime:editTime,
        editstatus: editstatus,
        editDes: editDes,
        showView: showView
    }

    return (clockApp);

}(jQuery));



