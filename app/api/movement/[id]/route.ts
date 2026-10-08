import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        message: "Getting note"
    })
}

export function UPDATE(){
    return NextResponse.json({
        message: "Updating your movement"
    })
}

export function DELETE(){
    return NextResponse.json({
        message: "Deleting your movement"
    })
}