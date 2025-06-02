import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const body = await request.json();

    const predictionUrl = process.env.NEXT_PUBLIC_prediction_url;
    if (!predictionUrl) {
      throw new Error("Environment variable 'prediction_url' is not defined.");
    }
    const res = await axios.post(predictionUrl, {
      red_fighter: body.red_fighter,
      blue_fighter: body.blue_fighter,
    });

    return NextResponse.json(res.data);
} 