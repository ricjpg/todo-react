import { useState } from 'react';

import { IPanelProps } from '../interfaces/IPanel'
import Card from './Card'

function Panel(props: IPanelProps) {
 
    const remove = () => {
        props.removePanel(props.title)
    }
    function removePanel (){
        if(props.title!=='Tareas Pendientes'){
            
            return(
                <button className="delete-section-btn" onClick={remove}>Eliminar</button>
            )
        }
        
    }



    return (
        <div className="columna">
            <h2> {props.title} </h2>
            {removePanel()}
            {
                props.tasks.map((task) => {
                    return (
                        <Card
                            task={task}
                            changeStatus={props.changeStatus}
                            deleteTask={props.deleteTask}
                            
                        />
                    )
                })
            }
            
        </div>
    )
}

export default Panel;
