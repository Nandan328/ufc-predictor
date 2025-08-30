import axios from "axios";
import { NextResponse } from "next/server";
import client from "@/app/lib/redis";

export async function GET() {
    if(!client.isOpen) await client.connect();

    const existingEvents = await client.get("previous_events");

    if(existingEvents) {
        return NextResponse.json(JSON.parse(existingEvents));
    }

    const url = process.env.NEXT_PUBLIC_prediction_url + "/event-details";
    const res = await axios.get(url);

    if(res.status == 200) {
        await client.set("previous_events", JSON.stringify(res.data["results"]));
        client.expire("previous_events", 60 * 60 * 12);
    }

    return NextResponse.json(res.data["results"]);
}