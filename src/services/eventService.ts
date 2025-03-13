import { PrismaClient, Event } from '@prisma/client';

export interface CreateEventInput {
  userId: string;
  title: string;
  start: Date;
  end: Date;
}

export class EventService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createEvent(data: CreateEventInput): Promise<Event> {
    const { userId, title, start, end } = data;

    const newEvent = await this.prisma.event.create({
      data: {
        userId,
        title,
        start,
        end
      }
    });

    return newEvent;
  }

  async findAllEvents(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }
}

export default EventService;
