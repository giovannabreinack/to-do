(() => {
    interface Task {
        id: string;
        dataCreated: Date;
        dataUpdate: Date;
        description: string;
        render(): string;
    }

    class Reminder implements Task {
        id: string;
        dataCreated: Date;
        dataUpdate: Date;
        description: string;
        render(): string {
            return JSON.stringify(this);
        }

    }
    const todo = {
        description: 'todo',
        done: false,
    };

    const reminder = {
        description: 'reminder',
        date: '30.06.2025',
    };

    const taskView = {
        render(tasks: Array<Object>) {
            const tasksList = document.getElementById('tasksList');
            while(tasksList?.firstChild){
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((tasks) => {
                const li = document.createElement('LI');
                const textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList?.appendChild(li);
            });
        },
    };

    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Object> = [todo, reminder];

        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        };

        document.getElementById('taskForm')
        ?.addEventListener('submit', handleEvent);
    };

    TaskController(taskView);
    
})();