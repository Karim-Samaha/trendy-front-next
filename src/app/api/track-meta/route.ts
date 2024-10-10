import axios from "axios";
import crypto from "crypto";

export async function POST(request: any) {
  const { eventType, eventData } = await request.json();
  try {
    const hashData = (data: string) => {
      return crypto.createHash("sha256").update(data).digest("hex");
    };
    const hashedEmail = hashData("trendy.rose11@gmail.com");
    const hashedPhone = hashData("96666666");
    const IpResponse = await axios.get("https://api.ipify.org?format=json");
    const response = await axios.post(
      `https://graph.facebook.com/v11.0/${process.env.NEXT_PUBLIC_META_PIXEL_ID}/events`,

      {
        data: [
          {
            event_name: eventType,
            event_time: Math.floor(new Date().getTime() / 1000),
            user_data: {
              em: hashedEmail,
              ph: hashedPhone,
              client_ip_address: IpResponse?.data?.ip || null,
              client_user_agent: eventData?.agent || null,
              fbp: eventData?.fbp || null,
              external_id: eventData?.external_id || null,
              ...(eventData?.fbclid && { fbclid: eventData.fbclid })
            },
            custom_data: {
              currency: "SAR",
              value: eventData.purchase_value,
              content_ids: [eventData.content_id],
              content_type: "product",
              quantity: eventData.quantity,
            },
            event_source_url: "https://www.trendyrosesa.com",
          },
        ],
        access_token: process.env.NEXT_PUBLIC_META_TOKEN,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_META_TOKEN}`,
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
          purchase_value: eventData?.purchase_value,
          client_user_agent: eventData?.agent || null,
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
