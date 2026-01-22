// Función para actualizar fechas de venta de datos existentes
function updateSoldDates() {
    clothing.forEach(item => {
        if (item.status === 'vendido' || item.status === 'pagado') {
            // Asignar fechas de venta en enero 2026
            const randomDay = Math.floor(Math.random() * 31) + 1;
            item.soldAt = `${randomDay}/1/2026`;
            
            if (item.status === 'pagado') {
                const paidDay = Math.floor(Math.random() * 31) + 1;
                item.paidAt = `${paidDay}/1/2026`;
            }
        }
    });
    saveData();
    loadStatistics();
    alert('Fechas de venta actualizadas a enero 2026');
}

// Llamar esta función una vez para actualizar los datos
updateSoldDates();