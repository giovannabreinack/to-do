(() => {
    interface Task {
        id: string;
        dataCreated: Date;
        dataUpdate: Date;
        description: string;
        render(): string;
    }

    class Reminder implements Task {
        id: string = '';
        dataCreated: Date = new Date();
        dataUpdate: Date = new Date();
        description: string = '';

        date: Date = new Date();
        notifications: Array<string> = ['EMAIL'];

        constructor(
            description: string, date: Date, notifications: Array<string>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }

        render(): string {
            return JSON.stringify(this);
        }
    }

    class Todo implements Task {
        id: string = '';
        dataCreated: Date = new Date();
        dataUpdate: Date = new Date();
        description: string = '';
        done: boolean = false;

        constructor(description: string) {
            this.description = description;
        }
        render(): string {
            return JSON.stringify(this);
        }

    }
    const todo = new Todo('Todo criado')

    const reminder = new Reminder('Reminder criado com a classe', new Date(), ['EMAIL']);

    const taskView = {
        render(tasks: Array<Object>) {
            const tasksList = document.getElementById('tasksList');
            while (tasksList?.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('LI');
                const textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList?.appendChild(li);
            });
        },
    };

    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [todo, reminder];

        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        };

        document.getElementById('taskForm')
            ?.addEventListener('submit', handleEvent);
    };

    TaskController(taskView);

})();