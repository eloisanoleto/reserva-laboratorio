// script.js

document.addEventListener('DOMContentLoaded', () => {
    const reservaForm = document.getElementById('reservaForm');
    const mensagem = document.getElementById('mensagem');
    const historicoReservas = document.getElementById('historicoReservas');

    let reservas = [];

    reservaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const lab = reservaForm.lab.value;
        const data = reservaForm.data.value;
        const hora = reservaForm.hora.value;

        if (lab && data && hora) {
            const reserva = { id: Date.now(), lab, data, hora };
            reservas.push(reserva);
            atualizarHistorico();
            reservaForm.reset();
        } else {
            mensagem.textContent = 'Por favor, preencha todos os campos.';
        }
    });

    function atualizarHistorico() {
        historicoReservas.innerHTML = '';
        reservas.forEach(reserva => {
            const divReserva = document.createElement('div');
            divReserva.innerHTML = `
                <p>${reserva.lab} - ${reserva.data} às ${reserva.hora} 
                <button onclick="editarReserva(${reserva.id})">Editar</button>
                <button onclick="excluirReserva(${reserva.id})">Excluir</button></p>
            `;
            historicoReservas.appendChild(divReserva);
        });
    }

    window.excluirReserva = function(id) {
        reservas = reservas.filter(reserva => reserva.id !== id);
        atualizarHistorico();
    };

    window.editarReserva = function(id) {
        const reserva = reservas.find(reserva => reserva.id === id);
        if (reserva) {
            reservaForm.lab.value = reserva.lab;
            reservaForm.data.value = reserva.data;
            reservaForm.hora.value = reserva.hora;
            excluirReserva(id);
        }
    };
});