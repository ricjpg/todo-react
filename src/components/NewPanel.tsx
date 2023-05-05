import React, { useState } from "react";
import { IPanelProps, NewPanelProps, NewPanelProp } from "../interfaces/IPanel";
import Panel from "./Panel";
import Card from "./Card";
// import { NewPanelProp } from "../interfaces/IPanel";


function NewPanelComponent(props: NewPanelProp) {
    const [PanelName, setPanelName] = useState<string>('')
    const [errores, setErrores] = useState<string[]>([])
    let panels:string[] = [];
    const [panelss, setPanelss] = useState<string[]>([])
    
    const validatePanel = () => {

        let newError: string[] = [];
        let namePanel:string=('')
        const newTitle = PanelName.trim().toLowerCase()
        setPanelss([...panelss, newTitle])

        console.log(namePanel)
        console.log(panels)
        console.log(errores)
        if (newTitle === '') {
            newError = [...newError, 'El nombre del Panel es obligatorio']
        }
        if (newTitle.length === 0) {
            newError = [...newError, 'El nombre del Panel es obligatorio']
        }
        if(panelss.includes(newTitle)){
            newError = [...newError, 'Ya existe']
            setPanelss([...panelss, newTitle])
        }
        if (newError.length === 0) {
            panels = [...panels, newTitle]
            props.newPanel(newTitle)
            setErrores([])
            // setPanelName('')
        console.log(panels)

        } else {
            setErrores([...newError])
        }
    }

    return (
        <div>
            <h2>Agregar nuevo Panel</h2>
            <form>
                <label>Panel:</label>
                <input type="text" id="newpanel" name="newpanel" placeholder="New Panel Name" onChange={(e)=>setPanelName(e.target.value)} value={PanelName}></input>
                <button type="button" onClick={validatePanel}>Add</button>
                <span>{PanelName}</span>
                
                
                <ul>
                    <li>{errores}</li>
                </ul>
            </form>
            
        </div>
        
    );

}

export default NewPanelComponent;