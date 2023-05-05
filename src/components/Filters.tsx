import React, { useEffect, useState } from "react";
import { IPanelProps } from "../interfaces/IPanel";

function NewFilterComponent() {

    const [teams, setTeams] = useState<string[]>(["Development", "QA", "PMs", "BI"])

    return (
        <div>
            <h2>Filtros</h2>
            <form>

                <label>Equipo:</label>
                <select id="filtro-estado" name="filtro-estado">
                {
                    teams.map((team)=>(
                        <option value={'Equipo'}>{team}</option>
                    ))
                }
                </select>
            </form>
        </div>

    );

}

export default NewFilterComponent;