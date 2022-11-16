(async () => {
    $(document).ready(function() {
        var t = $('#settingstable').DataTable({
           language: {
          emptyTable: "No hay reuniones establecidas"
        },
          responsive: true,
        searching: false, 
          paging: false, 
          info: false
    });
      //loadjsonrows
     async function addall () {
        var datafromjson = await window.AppApi.getclassoriginallist()
        datafromjson.forEach(element => {
        t.row.add( [
            `<input type="text" value="${element.name}" placeholder="Nombre de la reunion" required/>`,
            `<input type="text" value="${element.code}" placeholder="Codigo de la reunion" required/>`,
            `<input type="color" value="${element.color}" required/>`,
          '<button class="remove" value="false" style="background-color:#b35050;">Eliminar</button>'
        ] ).draw( false );
    });
    };
    
    addall()
      //loadjson rows
        $('#addRow').on( 'click', function () {
            t.row.add( [
                '<input type="text" placeholder="Nombre de la reunion" required/>',
                '<input type="text" placeholder="Codigo de la reunion" required/>',
                '<input type="color" placeholder="Color" value="#919191" required/>',
              '<button class="remove" value="false"style="background-color:#b35050;">Eliminar</button>'
            ] ).draw( false );
    
        } );
      
            $('#settingstable').on('click', '.remove', function () {
            var table = $('#settingstable').DataTable();
        var row = $(this).parents('tr');
        
        if ($(row).hasClass('child')) {
            table.row($(row).prev('tr')).remove().draw();
        }
        else
        {
            table
                .row($(this).parents('tr'))
                .remove()
            .draw();
            }
    
            });
      
      
      
      //  $('#addRow').click();
    } );
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
      var table = $("#settingstable")[0];
      
      //display the results
      var jsonfromtable = formToJSON(table)
      await window.AppApi.saveupdateclasslist(jsonfromtable)
      
    });
})()