export class Task {
    constructor(
        public taskId: number,
        public taskName: string,
        public taskDescription: string,
        public taskIsCompleted: boolean
    ) {}
}
