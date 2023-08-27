// import model and async wrapper
const Task = require('../model/Task')
const asyncWrapper = require('../middleware/async')
const{createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id : taskID} = req.params
    const task = await Task.findOne({ _id : taskID })

    if (!task) {
        return next(createCustomError(`No task witg id ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const {id : TaskID} = req.params
    const task = await Task.findOneAndUpdate({_id : TaskID}, req.body, {
        new: true,
        runValidators: true,
        }) 
    if (!task) {
        return next(createCustomError(`No task witg id ${taskID}`, 404))
    }
    res.status(200).json({ task })
})


const deleteTask = asyncWrapper(async (req, res) => {
    const {id : TaskID} = req.params
    const task = await Task.findByIdAndDelete({_id : TaskID}, req.body)

    if (!task) {
        return next(createCustomError(`No task witg id ${TaskID}`, 404))
    }
    res.status(200).json({ task })
})

// export modules
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}