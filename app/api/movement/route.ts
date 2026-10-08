import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        message: "Showing your movements"
    })
}

export function POST() {
    return NextResponse.json({
        message: "Saving your movement"
    })
}