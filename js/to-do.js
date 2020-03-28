//Declare array of tasks

var taskArray = [];

function addTask(ev){
    //determine if the enter key was pressed
    var keyCode = ev.keyCode;
    if(keyCode == '13'){
        var addTask = $("#txt-add-task").val();
        //Don't save if the task is empty
        if(/^ *$/.test(addTask)){
            return;
        }

        //Create task object and add to the array
        var taskObject = {
            nameTask: addTask,
            statusTask: "not completed" 
        };

        taskArray.push(taskObject);
         //Clean up txt-add-task
         $("#txt-add-task").val("");
        console.log(taskArray);

        // Save array data as string in localstorage
        localStorage.setItem('taskArray', JSON.stringify(taskArray));
        showTask();
    }

}

function showTask(){
    //Clean up task container
    $(".completed").html("<h3>Completed</h3>");
    $(".not-completed").html("<h3>Not completed</h3>");

    //Get the string of tasks from local storage.
    var localTask = localStorage.getItem('taskArray');

    //if taskArray is null that it no longer runs showTask
    if(localTask == null){
        return;
    }

    //Convert the string data to array of objects.
    taskArray = JSON.parse(localTask);

    //iterate over the array and adding task to the DOM.
    for(i=0; i<taskArray.length; i++){
        var nameTask = taskArray[i].nameTask;
        var statusTask = taskArray[i].statusTask;

        //Determine if the task is added to the container complete or not complete.
        if(statusTask=='not completed'){

            //Add task to .not-completed container.
            $(".not-completed").append('<div class="task" id = "id-task'+i+'">'+
                                        nameTask+
                                        '<i class="fas fa-trash-alt" onclick="deleteTask('+i+')"></i>'+
                                        '<i class="fas fa-check" onclick="checkTask('+i+')"></i>'+
                                        '</div>');
        }else if(statusTask == 'completed'){
            $(".completed").append('<div class="task" id = "id-task'+i+'">'+
            nameTask+
            '<i class="fas fa-trash-alt" onclick="deleteTask('+i+')"></i>'+
            '</div>');
        }
    }
}