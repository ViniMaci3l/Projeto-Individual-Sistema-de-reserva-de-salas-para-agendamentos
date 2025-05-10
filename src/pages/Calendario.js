export default function Calendario() {
    const pickDate = e => {
      localStorage.setItem('dataSelecionada', e.target.value);
      window.location.href = '/escolher-horario';
    };
  
    return (
      <div style={{ textAlign:'center', marginTop: 60 }}>
        <h2>Escolha uma Data</h2>
        <input type="date" onChange={pickDate} />
      </div>
    );
  }

  