import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { eventName, eventData } = req.body;

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
          "Access-Token": process.env.TIKTOK_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
