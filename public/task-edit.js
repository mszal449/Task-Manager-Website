// getting document objects
const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const formAlertDOM = document.querySelector('.form-alert')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.edit-btn')
const backLinkDOM = document.querySelector('.back-link');


// getting task id from parameters
const params = window.location.search
const id = new URLSearchParams(params).get('id')

// display task data up on loading website
const ShowTask = async () => {
    try {
        const { data : { task } } =
        await axios.get(`/api/v1/tasks/${id}`)
        const { _id : TaskID, name, completed } = task

        taskIDDOM.textContent = TaskID
        taskNameDOM.value = name
        if(completed) {
            taskCompletedDOM.checked = true
        }
        
    } catch (error) {
        console.log(error)
    }
}

ShowTask()

// submiting editted data
console.log('hello')

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...'
    e.preventDefault()

    try {
        const taskName = taskNameDOM.value
        const taskCompleted = taskCompletedDOM.checked
    
        const {
            data: { task },
          } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
          })
        
        const { _id : taskID, name, completed} = task
        taskIDDOM.textContent = taskID
        taskNameDOM.value = name
        if(completed) {
            taskCompletedDOM.checked = completed
        }

            formAlertDOM.style.display = 'block'
            formAlertDOM.textContent = 'Task succesfuly edited'
        formAlertDOM.classList.add('text-succes')
    } catch (error) {
        console.log(error)
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }

    editBtnDOM.textContent = 'Edit'
    setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})

// Add an event listener to handle the click event
backLinkDOM.addEventListener('click', () => {
    // Redirect the user to the tasks page
    window.location.href = 'index.html'; // Replace with the correct URL
});
