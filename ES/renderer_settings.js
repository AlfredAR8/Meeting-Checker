(async () => {
    async function addall () {
        var datafromjson = await window.AppApi.getappconfiglist()
            document.getElementById("numinput1").value = datafromjson[0].TimeCheck;
            document.getElementById('selectbox1').value = datafromjson[0].Language;
            document.getElementById("DiscordBotToken1").value = datafromjson[0].DiscordBotToken;
            document.getElementById("DiscordUserID1").value = datafromjson[0].DiscordUserID;
            var DiscordIntegrationenabled = datafromjson[0].DiscordIntegration === "true"
            var SystemTrayEnabled = datafromjson[0].SistemTray === "true"
            document.getElementById("checkbox21").checked = DiscordIntegrationenabled;
            document.getElementById("checkbox22").checked = SystemTrayEnabled;
            if ($("#checkbox21").is(':checked')) {
                $("#checkbox21").attr('value', 'true');
              } else {
                $("#checkbox21").attr('value', 'false');
              }
             
              $('#checkbox-value').text($('#checkbox21').val());

              if ($("#checkbox22").is(':checked')) {
                $("#checkbox22").attr('value', 'true');
              } else {
                $("#checkbox22").attr('value', 'false');
              }
             
              $('#checkbox-value').text($('#checkbox22').val());
    };
    addall()

function formToJSON(table){//begin function


    //array to hold the key name
    var keyName;
      
    //array to store the keyNames for the objects
    var keyNames = [];
    
    //array to store the objects
    var objectArray = [];
      
    
    //get the number of cols
    var numOfCols = table.rows[0].cells.length;
    
    //get the number of rows
    var numOfRows = table.rows.length;
      
    //add the opening [ array bracket
    objectArray.push("[");
      
      
      
    //loop through and get the propertyNames or keyNames
    for(var i = 0; i < numOfCols; i++){//begin for loop  
         
      //store the html of the table heading in the keyName variable
    keyName = table.rows[0].cells[i].id;
      
      //add the keyName to the keyNames array
      keyNames.push(keyName);
        
    }//end for loop
      
        
      
      //loop through rows
      for(var i = 1; i < numOfRows; i++){//begin outer for loop    
        
        //add the opening { object bracket
        objectArray.push("{\n");
                
      for(var j=0; j < numOfCols; j++){//begin inner for loop   
        
     //extract the text from the input value in the table cell
     var inputValue = table.rows[i].cells[j].children[0].value;
        
      //store the object keyNames and its values
     objectArray.push("\"" + keyNames[j] + "\":" + "\"" + inputValue + "\"");
    
    //if j less than the number of columns - 1(<-- accounting for 0 based arrays)
    if(j < (numOfCols - 1)){//begin if then
      
      //add the , seperator
      objectArray.push(",\n");
      
    }//end if then    
        
      }//end inner for loop
        
        //if i less than the number of rows - 1(<-- accounting for 0 based arrays)
        if(i < (numOfRows - 1)){//begin if then
        
          //add the closing } object bracket followed by a , separator
          objectArray.push("\n},\n");
        
      }
        else{
          
          //add the closing } object bracket
          objectArray.push("\n}");
          
        }//end if then else
      
      }//end outer for loop
    
       //add the closing ] array bracket
       objectArray.push("]");
      
      return objectArray.join("");
      
      
    }//end function
    
    
    $("#test-form").on("submit",async function(e){
      
      //stop form form submitting
      e.preventDefault();
      
      //the table object 
      var table = $("#json-table")[0];
      
      //display the results
      var jsonfromtable = formToJSON(table)
      await window.AppApi.saveupdatesettingslist(jsonfromtable)
      
    });

    document.getElementById("reloadcredentials").addEventListener('click', async () => {
      await window.AppApi.spawnservicereload()
      })
    
    //checkbox
    $('#checkbox-value').text($('#checkbox21').val());
    
    $("#checkbox21").on('change', function() {
      if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
      } else {
        $(this).attr('value', 'false');
      }
     
      $('#checkbox-value').text($('#checkbox21').val());
    });

    $('#checkbox-value').text($('#checkbox22').val());
    $("#checkbox22").on('change', function() {
      if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
      } else {
        $(this).attr('value', 'false');
      }
     
      $('#checkbox-value').text($('#checkbox22').val());
    });

    
    document.getElementById("checkbox21").addEventListener('change', function(){ document.getElementById("DiscordBotToken1").required = this.checked ;
       document.getElementById("DiscordUserID1").required = this.checked ;
    })
})()