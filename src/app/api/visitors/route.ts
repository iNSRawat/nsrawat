import { NextResponse } from "next/server";

export async function GET() {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const apiToken = process.env.UMAMI_API_TOKEN;

  if (!websiteId) {
    console.warn("Visitor API: UMAMI_WEBSITE_ID is missing.");
    return NextResponse.json({ success: true, visitors: 35479 });
  }

  if (!apiToken) {
    console.warn("Visitor API: UMAMI_API_TOKEN is missing.");
    return NextResponse.json({ success: true, visitors: 35479 });
  }

  try {
    const statsUrl = `https://analytics.nsrawat.in/api/websites/${websiteId}/stats?startAt=0&endAt=${Date.now()}`;
    console.log(`Visitor API: Fetching from ${statsUrl}`);

    const response = await fetch(statsUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "x-umami-api-key": apiToken,
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Visitor API: Umami Error (${response.status}):`,
        errorText,
      );
      throw new Error("Umami API error");
    }

    const data = (await response.json()) as {
      visitors: { value: number };
      pageviews: { value: number };
    };

    console.log("Visitor API: Success, count is", data.visitors.value);

    return NextResponse.json({
      success: true,
      visitors: data.visitors.value,
      pageviews: data.pageviews.value,
    });
  } catch (error) {
    console.error("Visitor API: Failed to fetch stats:", error);
    return NextResponse.json({ success: true, visitors: 35479 });
  }
}
