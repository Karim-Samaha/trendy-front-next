import axios from "axios";
import crypto from "crypto";

export async function POST(request: any) {
  const { eventType, eventData } = await request.json();
  try {
    const hashData = (data) => {
      return crypto.createHash("sha256").update(data).digest("hex");
    };
    const hashedEmail = hashData("trendy.rose11@gmail.com");

    const response = await axios.post(
      "https://tr.snapchat.com/v2/conversion",
      {
        pixel_id: process.env.NEXT_PUBLIC_META_SNAPCHAT_ID,
        event_type: eventType,

        event_conversion_type: "WEB",
        event_time: new Date().getTime(),
        timestamp: new Date().getTime(),

        event: {
          currency: "SAR",
          purchase_value: 50,
          timestamp: new Date().getTime(),
        },
        hashed_email: hashedEmail,
        properties: {
          currency: "SAR",
          content_type: "product",
          quantity: +eventData?.quantity || 1,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SNAPCHAT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(
      JSON.stringify({ message: "Success", eventData: eventData })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: error.response?.data || error.message,
        event: {
          timestamp: "2023-08-15T12:34:56Z",

          currency: "SAR",
          purchase_value: eventData?.value,
        },
        properties: {
          currency: "SAR",
          content_type: "product",
          quantity: +eventData?.quantity || 1,
        },
      }),
      { status: 400 }
    );
  }
}
