export async function generateAffirmation(
    type: "daily" | "custom",
    userContext?: string
  ) {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/affirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, userContext }),
    });
    if (!res.ok) throw new Error(await res.text());
    const { text } = await res.json();
    return text as string;
  }
