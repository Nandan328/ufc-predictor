import axios from "axios";
import fighters from "./../../../data/fighter_names.json"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const body = await request.json();


    const predictionUrl = process.env.NEXT_PUBLIC_prediction_url;
    if (!predictionUrl) {
      throw new Error("Environment variable 'prediction_url' is not defined.");
    }

    const red_fighter = fighters.find(f => f?.name.toLowerCase() === body.red_fighter.toLowerCase());
    const blue_fighter = fighters.find(f => f?.name.toLowerCase() === body.blue_fighter.toLowerCase());

    if (!red_fighter || !blue_fighter) {
      throw new Error("Invalid fighter names.");
    }

    console.log("Red Fighter:", red_fighter);
    console.log("Blue Fighter:", blue_fighter);

    const res = await axios.get(predictionUrl, {
      params: {
        red_id: red_fighter.id,
        blue_id: blue_fighter.id
      }
    });
    return NextResponse.json(res.data);
} 