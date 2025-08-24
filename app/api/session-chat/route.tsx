import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { eq, desc } from 'drizzle-orm'; // Add desc import


export async function POST(req:NextRequest){
    const {notes, selectedDoctor} = await req.json();
    const user = await currentUser();
    
    try {
        const sessionId = uuidv4();
        const result = await db.insert(SessionChatTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdOn: (new Date()).toString()
        }).returning({ 
            sessionId: SessionChatTable.sessionId,
            id: SessionChatTable.id 
        });

        return NextResponse.json({ 
            sessionId: result[0].sessionId,
            id: result[0].id 
        });
    }
    catch(e){
        return NextResponse.json(e)
    }
}


export async function GET(req:NextRequest){
    try {
        const {searchParams} = new URL(req.url);
        const sessionId = searchParams.get('sessionId');
        const user = await currentUser();

        if (!user?.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        if(sessionId === 'all'){
            const result = await db.select()
                .from(SessionChatTable)
                .where(eq(SessionChatTable.createdBy, user.primaryEmailAddress.emailAddress))
                .orderBy(desc(SessionChatTable.id));

            return NextResponse.json(result); // Return the full array
        } else {
            const result = await db.select()
                .from(SessionChatTable)
                .where(eq(SessionChatTable.sessionId, sessionId!));

            if (!result.length) {
                return NextResponse.json({ error: 'Session not found' }, { status: 404 });
            }

            return NextResponse.json(result[0]);
        }
    } catch (error) {
        console.error('Error in GET /api/session-chat:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}