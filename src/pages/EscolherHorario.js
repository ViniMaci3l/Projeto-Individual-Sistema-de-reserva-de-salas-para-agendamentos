const horarios = ["08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00"];

export default function EscolherHorario() {
const escolher = h => {
localStorage.setItem('horarioSelecionado', h);
window.location.href = '/confirmacao';
};

return (
<div style={{ maxWidth: 320, margin:'auto' }}>
<h2>Escolha um Horário</h2>
{horarios.map(h => (
<button key={h} onClick={() => escolher(h)} style={{ margin:4 }}>
{h}
</button>
))}
</div>
);
}
