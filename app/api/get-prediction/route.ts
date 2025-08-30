import axios from "axios";
import fighters from "./../../../data/fighter_names.json"
import { NextRequest, NextResponse } from "next/server";
import client from "@/app/lib/redis";

export async function POST(request: NextRequest) {

  if(!client.isOpen) {
    await client.connect();
  }

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

    const data = await client.lRange(`prediction`, 0, -1);
    if(data) {
      const cachedPrediction = data.find(item => {
        const redId = item.split(":")[0].trim().replace(/"/g, '');
        const blueId = item.split(":")[1].trim();
        return redId == red_fighter.id && blueId == blue_fighter.id;
      });
      if(cachedPrediction) {
        const res = JSON.parse(JSON.parse(cachedPrediction).split(red_fighter.id + ":" + blue_fighter.id + ":")[1]);
        return NextResponse.json(res)
      }
    }
    const res = await axios.get(predictionUrl + "/predict-single-fight", {
      params: {
        red_id: red_fighter.id,
        blue_id: blue_fighter.id
      }
    });
    client.lPush(`prediction`, JSON.stringify(`${red_fighter.id}:${blue_fighter.id}:${JSON.stringify(res.data)}`));
    const array = await client.lRange(`prediction`, 0, -1);
    if(array.length > 5) {
      await client.lTrim(`prediction`, 0, 4);
    }
    return NextResponse.json(res.data);
} 