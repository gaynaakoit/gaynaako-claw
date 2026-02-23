export class Notification {
    async execute(input?: any) {
        console.log('notification.agent.ts initialized');
        return { status: 'ok' };
    }
}
