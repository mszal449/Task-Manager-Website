const taskDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

loadingDOM.style.visibility='hidden'


const showTasks = async() => {
    loadingDOM.style.visibility = 'visible'
    loadingDOM.style.display= 'block'


    try {
        const {
            data: { tasks },
        } = await axios.get('/api/v1/tasks')
        if (tasks.length < 1) {
            taskDOM.innerHTML = '<h5 class="empty-list" \
            style="text-align: center">No tasks in your list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        }

        const allTasks = tasks.map((task) => {
            const {completed, _id: taskID, name} = task
            return `<div class="single-task ${completed && 'task-completed'}">
            <div class="name-container">
              <h4 class="task-name" ><span ><i class="far fa-check-circle"></i></span>${name}</h4>
              <h5 class="task-id">Completed: ${completed}</h5>
            </div>
            <div class="task-links">
            
            <!-- edit link -->
            <a href="task.html?id=${taskID}"  class="edit-link">edit
            <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">X</button>
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>`
        }).join('')
        taskDOM.innerHTML = allTasks
    } catch (error) {
        taskDOM.innerHTML = 
        '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
    loadingDOM.style.display = 'none'
}

showTasks()


taskDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value
    console.log('Form submitted');

    try {
        console.log('Sending POST request...');
        const response = await axios.post('/api/v1/tasks', { name })

        console.log('POST request successful:', response.data);

        showTasks()
        taskInputDOM.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, task added`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
      console.log(error)
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
        setTimeout(() => {
          formAlertDOM.style.display = 'none'
          formAlertDOM.classList.remove('text-success')
        }, 3000)
      }
      showTasks()
})