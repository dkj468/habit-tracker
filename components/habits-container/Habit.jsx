import classes from './Habit.module.css';

const Habit = (props) => {
    const {id, name} = {...props.habit}
    return (
        <div className={classes.habit} id={id}>
            <p>{name}</p>
            <div>
                <span>This is habit action</span>
            </div>
        </div>
    )
}

export default Habit;