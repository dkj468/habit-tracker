import classes from './NewHabit.module.css';

const NewHabit = () => {
    return (
        <form>
            <input type='text' placeholder='habit name' />
            <input type='date' placeholder='start date' />
            <button type='submit'>Add Habit</button>
        </form>
    )
}

export default NewHabit;