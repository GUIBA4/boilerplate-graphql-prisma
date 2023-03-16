import { PrismaClient } from '@prisma/client';

import prismaEnviroment from './prisma-enviroment';

class PrismaConnector {
  private readonly url: string = prismaEnviroment.url;

  client: null | PrismaClient = null;

  connect(databaseUrl?: string): PrismaClient {
    if (this.client !== null) {
      return this.client;
    }

    this.client = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl || this.url,
        },
      },
    });

    return this.client;
  }

  async disconnect(): Promise<void> {
    if (this.client !== null) {
      await this.client.$disconnect();
    }
  }
}

const prismaConnector = new PrismaConnector();

export { prismaConnector };
