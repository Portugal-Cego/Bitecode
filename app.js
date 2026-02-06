async function hack() {
  const recipe = document.getElementById('recipe').value;
  if (!recipe) return alert('Insere uma receita');

  const btn = document.getElementById('btn');
  btn.innerText = 'A analisar composição…';
  btn.disabled = true;

  const res = await fetch('/api/hack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipe })
  });

  const data = await res.json();

  document.getElementById('result').classList.remove('hidden');
  document.getElementById('kcal').innerText = `${data.original} ➜ ${data.optimized}`;
  document.getElementById('subs').innerHTML = data.subs.map(s => `<li>• ${s}</li>`).join('');
  document.getElementById('tip').innerText = data.tip;

  btn.innerText = 'Hackear Receita ⚡';
  btn.disabled = false;
}