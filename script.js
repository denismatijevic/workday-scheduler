$(document).ready(function() {
  
    // test flag
    const test = false;
  
    // get times from moment
    const now = moment().format('MMMM Do YYYY');
  
    // commented out for test in non-standard hours
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
  
    // set times for tesitng after hours
    if (test) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
  
    let $dateHeading = $('#navbar-subtitle');
    $dateHeading.text(now);
    
    // font awesome icon https://fontawesome.com/license
    const saveIcon = "./images/save-regular.svg"; 
  
    // Parsing the JSON string to an object
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    if (test) { console.log(storedPlans); }
  
    // Local storage pull
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      planTextArr = new Array(9);
      planTextArr[4] = "stretch break";
    }
  
    if (test) { console.log("full array of plned text",planTextArr); }
  
    // set variable for the planner
    let $plannerDiv = $('#plannerContainer');
    // clear elements
    $plannerDiv.empty();
  
    if (test) { console.log("current time",nowHour12); }
  
  
    // build calendar by row for fix set of hours
    for (let hour = 6; hour <= 22; hour++) {
      // index for array use offset from hour
      let index = hour - 9;
      
      // build row components
      let $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      // Start building Time box portion of row
      let $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2');
    
      // create timeBox element (contains time)
      const $timeBoxSpn = $('<span>');
      // can use this to get value
      $timeBoxSpn.attr('class','timeBox');
      
      // format hours for display 24hr clock
      let displayHour = 0;
      let ampm = "";
      if (hour > 24) { 
        displayHour = hour - 24;
      } else {
        displayHour = hour;
      }
      
      // populate timeBox with time
      $timeBoxSpn.text(`${displayHour} ${ampm}`);
  
      // insert into col inset into timebox
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);
      // STOP building Time box portion of row
  
      // START building input portion of row
      // build row components
      let $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
  
      // access index from data array for hour 
      $dailyPlanSpn.val( planTextArr[index] );
      
      // create col to control width
      let $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      // add col width and row component to row
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
      // STOP building Time box portion of row
  
      // START building save portion of row
      let $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      
      // add col width and row component to row
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      // STOP building save portion of row
  
      // set row color based on time
      updateRowColor($rowDiv, hour);
      
      // add row to planner container
      $plannerDiv.append($rowDiv);
    };
  
    // function to update row color
    function updateRowColor ($hourRow,hour) { 
  
      if (test) { console.log("rowColor ",nowHour24, hour); }
  
      if ( hour < nowHour24) {
        // $hourRow.css('')
        if (test) { console.log("lessThan"); }
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        if (test) { console.log("greaterthan"); }
        $hourRow.css("background-color","lightgreen")
      } else {
        if (test) { console.log("eqaul"); }
        $hourRow.css("background-color","tomato")
      }
    };
  
    // save to local storage
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      if (test) { console.log('click pta before '+ planTextArr); }
  
      let $index = $(this).attr('save-id');
  
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
  
      planTextArr[$index] = $value;
  
  
      if (test) { console.log('value ', $value); }
      if (test) { console.log('index ', $index); }
      if (test) { console.log('click pta after '+ planTextArr); }
  
      // remove shawdow pulse class
      $(`#saveid-${$index}`).removeClass('shadowPulse');
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // function to color save button on change of input
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      if (test) { console.log('onChange'); }
      if (test) { console.log('id', $(this).attr('hour-index')); }
  
      let i = $(this).attr('hour-index');
  
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });