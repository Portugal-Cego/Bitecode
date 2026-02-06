export default async function handler(req, res) {
  const { recipe } = req.body;

  const prompt = `Atua como engenheiro químico de alimentos.
Objetivo: reduzir calorias mantendo textura e prazer sensorial.

Receita:
${recipe}

Responde APENAS JSON:
{"original":"X kcal","optimized":"Y kcal","subs":[],"tip":""}`;

  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=API_KEY",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents:[{ parts:[{ text: prompt }]}] })
    }
  );

  const j = await r.json();
  const text = j.candidates[0].content.parts[0].text.replace(/```json|```/g,'');
  res.status(200).json(JSON.parse(text));
}