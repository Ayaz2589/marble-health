import { NextRequest, NextResponse } from 'next/server';
import { EventService } from '@/services';

const eventService = new EventService();

export async function POST(request: NextRequest) {
  try {
    const { userId, title, start, end } = await request.json();

    if (!userId || !title || !start || !end) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newEvent = await eventService.createEvent({
      userId,
      title,
      start: new Date(start),
      end: new Date(end),
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const events = await eventService.findAllEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error retrieving events:', error);
    return NextResponse.json({ error: 'Failed to retrieve events' }, { status: 500 });
  }
}
