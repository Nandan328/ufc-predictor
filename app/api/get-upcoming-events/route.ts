import { NextResponse } from "next/server";
import client from "@/app/lib/redis";
import axios from "axios";

export  async function GET() {
    if(!client.isOpen) {
        await client.connect()
    }

    const existingEvents = await client.get("upcoming_events");
    if(existingEvents) {
        return NextResponse.json(JSON.parse(existingEvents))
    }

    const url = process.env.NEXT_PUBLIC_prediction_url + "/predict_upcoming_event";
    const res = await axios.get(url )

    if(res.status == 200) {
        await client.set("upcoming_events", JSON.stringify(res.data["predictions"]));
        await client.expire("upcoming_events", 60 * 60 * 12);
    }


    return NextResponse.json(res.data["predictions"]);
}   