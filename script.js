const target = new Date('2026-08-05T15:00:00-07:00');
const el = document.getElementById('countdown');
function updateCountdown(){
  if(!el) return;
  const now = new Date();
  const diff = target - now;
  if(diff <= 0){ el.textContent = 'Vacation time'; return; }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  el.textContent = `${days} days · ${hours} hrs · ${mins} min`;
}
updateCountdown();
setInterval(updateCountdown, 60000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const boxes = Array.from(document.querySelectorAll('.check-grid input'));
const percentEl = document.getElementById('pack-percent');
const countEl = document.getElementById('pack-count');
function updatePackingMeter(){
  const total = boxes.length;
  const checked = boxes.filter(box => box.checked).length;
  const pct = total ? Math.round((checked / total) * 100) : 0;
  if(percentEl) percentEl.textContent = `${pct}%`;
  if(countEl) countEl.textContent = `${checked} of ${total} packed`;
}
boxes.forEach((box, index) => {
  const key = `sunriver-pack-${index}`;
  box.checked = localStorage.getItem(key) === 'true';
  box.addEventListener('change', () => {
    localStorage.setItem(key, box.checked);
    updatePackingMeter();
  });
});
updatePackingMeter();
