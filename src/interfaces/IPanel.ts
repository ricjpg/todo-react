import { ITask } from "./ITask";

export interface IPanelProps {
    title: string;
    tasks: ITask[];
    changeStatus: (id: number, status: string) => void;
    deleteTask: (id: number) => void;
    removePanel: (title: string) => void;
}

export interface NewPanelProps {
    title: string;
    task: ITask[];
    changeStatus: (id: number, status: string) => void;
    deleteTask: (id: number) => void;
    onSave: () => void;
}

export interface NewPanelProp{
    newPanel: (title:string) => void;
    panels?: string[];
}