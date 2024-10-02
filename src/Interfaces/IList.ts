export interface ISubTask {
    titulo: string;
    descricao: string;
}

export interface ITask {
    titulo: string;
    descricao: string;
    prioridade: string;
    venceEm: string;
    subTasks?: ISubTask[];
}

export interface IList {
    id: string;
    iduser: string;
    nome: string;
    tasks: ITask[];
}

export interface CreateList {
    iduser: string,
    nome:string,
    task: ITask
}

// src/interfaces/Task.ts
export interface CreateTask {
    id: string; // ID da lista à qual a tarefa pertence
    taskData: {
        titulo: string;         // Título da tarefa
        descricao: string;      // Descrição da tarefa
        prioridade: string;     // Prioridade da tarefa
        venceEm: string;        // Data de vencimento da tarefa
    };
}
