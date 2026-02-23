export class CompanyProfileAgent {
    async execute(input?: any): Promise<{ status: string }> {
      console.log('company-profile.agent.ts initialized');
      return { status: 'ok' };
    }
  }