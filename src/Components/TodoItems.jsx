import react from 'react';

const TodoItems=(props)=>{
    return(
        <li className='todo-items'>
            <span>
             <input type="checkbox"/>
            <span>{props.content}</span>
            </span>
            <p>...</p>
        </li>
    );
};

export default TodoItems;