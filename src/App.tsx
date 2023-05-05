import React, { useState , useEffect } from 'react';
import Calendar from 'react-calendar'
import logo from './logo.svg';
import './App.css';
import Swal from 'sweetalert2'
import { ITask } from './interfaces/ITask' 
import { IPanelProps, NewPanelProps } from './interfaces/IPanel' 

import TaskForm from './components/TaskForm'
import Panel from './components/Panel'
import NewPanelComponent from './components/NewPanel';
import NewFilterComponent from './components/Filters';



function App() {

  const [id, setId] = useState<number>(0)
  const [task, setTask] = useState<ITask>({ "status" : "TODO", "id": 0 })
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [teams, setTeams] = useState<string[]>(["Development", "QA", "PMs", "BI"])


  const [panels, setPanels] = useState<string[]>([])
  const statusOptions: string[] = ["Development", ...panels]

  const handleAddPanel = (title: string) => {
    setPanels([...panels, title]);
    // console.log(panels)
    setTask({...task, status:title});
    
  }


  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({...task, [e.target.name]: e.target.value})
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTask({...task, [e.target.name]: e.target.value})
  }

  const changeStatus = (id: number, status: string) => {
    const newTaskList = taskList.map( task => {
      if(task.id === id) {
        task.status = status
      }
      return task
    })
    setTaskList(newTaskList)
  }

  const deleteTask = (id: number) => {
    const newTaskList = taskList.filter( task => task.id !== id )
    setTaskList(newTaskList)
  }

  const addTask = () => {   
    
    setTaskList([...taskList, task])
    const newId: number = id + 1
    setId(newId)

    setTask({ 
      "id" : newId
      , "status" : "TODO" 
      , "name" : "" 
      , "team" : "" 
      , "hours" : 0 
      , 'enddate': task.enddate
    })
  }
  
  
  const[lastDay, setLastDay] = useState<string>('')
  const[lastDay2, setLastDay2] = useState<string>('')

  function handleDayClick (value:Date) {

    setLastDay(value? new Date(value).toISOString().substr(0,10).split('T')[0] : '')
    setLastDay2(task.enddate? new Date(task.enddate).toISOString().substr(0,10).split('T')[0] : '')
    
    console.log(lastDay)
    console.log(lastDay2)
    // console.log(task.enddate)
    if(lastDay.toString() === lastDay2.toString()){
      return(
        Swal.fire('Alert', 'You have something to do that dat', 'warning')
        );
    }
  }


  const removePanel = (title: string) => {
    const newPanels = panels.filter((panel) => panel !== title)
    setPanels(newPanels)
  }



  return (
    <div className="App">
      
      <header>
          <h1>TODO List</h1>
          <NewPanelComponent
          newPanel={handleAddPanel} panels = {panels || []}
          />
          
          
      </header>
      
      <div className="container">
        <TaskForm 
            task={task} 
            teams={teams} 
            onChangeInput={handleInputChange}
            onChangeSelect={handleSelectChange}
            onSave={addTask}             
        />
        <NewFilterComponent></NewFilterComponent>
        <div className="columnas">
          <Panel 
            title={"Tareas Pendientes"} 
            tasks={ taskList.filter( task => task.status === 'TODO' ) }
            changeStatus={changeStatus}
            deleteTask={deleteTask}
            removePanel={removePanel}
          />
          
          {/* <Panel 
            title={"Tareas en progreso"} 
            tasks={ taskList.filter( task => task.status === 'In Progress' ) }
            changeStatus={changeStatus}
            deleteTask={deleteTask}
          />
          <Panel 
            title={"Tareas Completadas"} 
            tasks={ taskList.filter( task => task.status === 'Completed' ) }
            changeStatus={changeStatus}
            deleteTask={deleteTask}
          /> */}
          {
            panels.map((title) =>(
              <Panel
              key={title}
              title={title}
              tasks={ taskList.filter( task => task.status === title ) }
              changeStatus={changeStatus}
              deleteTask={deleteTask}
              removePanel={removePanel}
              
              />
            ))
          }
        
          
        </div>
        <span>{panels}</span>
        <Calendar className={'calendar-container'} 
        
        showDoubleView={false} 
        showNavigation={false} 
        showNeighboringMonth={false} 
        showWeekNumbers={false}
        onClickDay={handleDayClick}
        
        
        />
        
      </div>
      
    </div>
  );
}

export default App;
