import axios from "axios";

export async function POST(request: any) {

  const { eventName, eventData } = await request.json();
  try {
    const response = await axios.post(
      "https://business-api.tiktok.com/open_api/v1.2/pixel/track/",
      {
        pixel_code: process.env.TIKTOK_PIXEL_CODE,
        event: eventName,
        properties: eventData,
      },
      {
        headers: {
          "Access-Token": process.env.NEXT_PUBLIC_TIKTOK_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    return new Response(
      JSON.stringify({ message: "Success", eventData: eventData })
    );
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
