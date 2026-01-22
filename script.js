// Datos del sistema
let users = JSON.parse(localStorage.getItem('users')) || [];
let clothing = JSON.parse(localStorage.getItem('clothing')) || [];

// Función para cargar datos de ejemplo manualmente
function loadSampleData() {
    if (confirm('¿Estás seguro? Esto agregará 5 usuarios y 25 prendas de ejemplo. Los datos existentes no se eliminarán.')) {
        createSampleData(true);
        loadUsers();
        loadUserOptions();
        loadSummary();
        loadStatistics();
        alert('Datos de ejemplo cargados correctamente!');
    }
}

// Función para crear datos de ejemplo
function createSampleData(force = false) {
    if (force || (users.length === 0 && clothing.length === 0)) {
        // Crear 5 usuarios
        const sampleUsers = [
            { id: 1, name: 'María González', phone: '11-2345-6789', createdAt: '15/1/2026' },
            { id: 2, name: 'Juan Carlos Pérez', phone: '11-3456-7890', createdAt: '16/1/2026' },
            { id: 3, name: 'Ana Rodríguez', phone: '11-4567-8901', createdAt: '17/1/2026' },
            { id: 4, name: 'Carlos Martínez López', phone: '11-5678-9012', createdAt: '18/1/2026' },
            { id: 5, name: 'Laura Fernández', phone: '11-6789-0123', createdAt: '19/1/2026' }
        ];
        
        // Crear 25 prendas (5 por usuario)
        const sampleClothing = [
            // María González (id: 1)
            { id: 101, userId: 1, description: 'Remera Nike negra talle M', salePrice: 1500, userPrice: 900, status: 'pendiente', createdAt: '15/1/2026' },
            { id: 102, userId: 1, description: 'Jean Levis azul talle 28', salePrice: 2800, userPrice: 1800, status: 'vendido', createdAt: '15/1/2026' },
            { id: 103, userId: 1, description: 'Campera Adidas gris talle L', salePrice: 3500, userPrice: 2200, status: 'pagado', createdAt: '16/1/2026' },
            { id: 104, userId: 1, description: 'Zapatillas Converse blancas 38', salePrice: 4200, userPrice: 2800, status: 'vendido', createdAt: '16/1/2026' },
            { id: 105, userId: 1, description: 'Buzo Puma rojo talle S', salePrice: 2200, userPrice: 1400, status: 'pendiente', createdAt: '17/1/2026' },
            
            // Juan Carlos Pérez (id: 2)
            { id: 201, userId: 2, description: 'Camisa Tommy azul talle L', salePrice: 1800, userPrice: 1100, status: 'vendido', createdAt: '16/1/2026' },
            { id: 202, userId: 2, description: 'Pantalón chino beige talle 32', salePrice: 2400, userPrice: 1500, status: 'pagado', createdAt: '17/1/2026' },
            { id: 203, userId: 2, description: 'Sweater Lacoste verde talle M', salePrice: 3200, userPrice: 2000, status: 'vendido', createdAt: '17/1/2026' },
            { id: 204, userId: 2, description: 'Bermuda Quicksilver talle L', salePrice: 1600, userPrice: 1000, status: 'pendiente', createdAt: '18/1/2026' },
            { id: 205, userId: 2, description: 'Chomba Polo Ralph Lauren M', salePrice: 2800, userPrice: 1800, status: 'pagado', createdAt: '18/1/2026' },
            
            // Ana Rodríguez (id: 3)
            { id: 301, userId: 3, description: 'Vestido Zara floreado talle S', salePrice: 2600, userPrice: 1600, status: 'pendiente', createdAt: '17/1/2026' },
            { id: 302, userId: 3, description: 'Blusa H&M blanca talle M', salePrice: 1400, userPrice: 850, status: 'vendido', createdAt: '18/1/2026' },
            { id: 303, userId: 3, description: 'Falda Forever21 negra talle S', salePrice: 1800, userPrice: 1100, status: 'pagado', createdAt: '18/1/2026' },
            { id: 304, userId: 3, description: 'Cardigan Uniqlo gris talle M', salePrice: 2200, userPrice: 1400, status: 'vendido', createdAt: '19/1/2026' },
            { id: 305, userId: 3, description: 'Botas Paruolo marrones 37', salePrice: 5500, userPrice: 3500, status: 'pendiente', createdAt: '19/1/2026' },
            
            // Carlos Martínez López (id: 4)
            { id: 401, userId: 4, description: 'Traje Armani gris talle 48', salePrice: 8500, userPrice: 5500, status: 'pagado', createdAt: '18/1/2026' },
            { id: 402, userId: 4, description: 'Corbata Hermès azul', salePrice: 1200, userPrice: 750, status: 'vendido', createdAt: '19/1/2026' },
            { id: 403, userId: 4, description: 'Zapatos Gucci negros 42', salePrice: 12000, userPrice: 8000, status: 'vendido', createdAt: '19/1/2026' },
            { id: 404, userId: 4, description: 'Camisa Versace blanca talle L', salePrice: 2800, userPrice: 1800, status: 'pendiente', createdAt: '20/1/2026' },
            { id: 405, userId: 4, description: 'Cinturón Louis Vuitton', salePrice: 3500, userPrice: 2200, status: 'pagado', createdAt: '20/1/2026' },
            
            // Laura Fernández (id: 5)
            { id: 501, userId: 5, description: 'Bikini Rip Curl talle M', salePrice: 1800, userPrice: 1100, status: 'pendiente', createdAt: '19/1/2026' },
            { id: 502, userId: 5, description: 'Short Hollister azul talle S', salePrice: 1600, userPrice: 1000, status: 'vendido', createdAt: '20/1/2026' },
            { id: 503, userId: 5, description: 'Top Adidas deportivo talle M', salePrice: 1200, userPrice: 750, status: 'pagado', createdAt: '20/1/2026' },
            { id: 504, userId: 5, description: 'Calza Nike negra talle S', salePrice: 1400, userPrice: 900, status: 'vendido', createdAt: '21/1/2026' },
            { id: 505, userId: 5, description: 'Zapatillas Vans rojas 36', salePrice: 3800, userPrice: 2400, status: 'pendiente', createdAt: '21/1/2026' }
        ];
        
        users = [...users, ...sampleUsers];
        clothing = [...clothing, ...sampleClothing];
        saveData();
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    createSampleData();
    loadUsers();
    loadUserOptions();
    loadSummary();
    loadStatistics();
    populateFilters();
    
    // Event listeners
    document.getElementById('userForm').addEventListener('submit', addUser);
    document.getElementById('clothingForm').addEventListener('submit', addClothing);
    document.getElementById('editForm').addEventListener('submit', updateClothing);
    document.getElementById('quickClothingForm').addEventListener('submit', addQuickClothing);
});

// Funciones de navegación
function showTab(tabName) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar pestaña seleccionada
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Actualizar datos si es necesario
    if (tabName === 'resumen') {
        loadSummary();
    } else if (tabName === 'estadisticas') {
        loadStatistics();
    }
}

// Funciones de usuarios
function addUser(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    
    if (!name) return;
    
    const user = {
        id: Date.now(),
        name: name,
        phone: phone,
        createdAt: new Date().toLocaleDateString()
    };
    
    users.push(user);
    saveData();
    loadUsers();
    loadUserOptions();
    
    // Limpiar formulario
    document.getElementById('userForm').reset();
}

function loadUsers() {
    const usersList = document.getElementById('usersList');
    const searchTerm = document.getElementById('userSearch')?.value.toLowerCase() || '';
    
    let filteredUsers = users;
    if (searchTerm) {
        filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            (user.phone && user.phone.toLowerCase().includes(searchTerm))
        );
    }
    
    if (filteredUsers.length === 0) {
        usersList.innerHTML = searchTerm ? 
            '<p>No se encontraron usuarios que coincidan con la búsqueda</p>' : 
            '<p>No hay usuarios registrados</p>';
        return;
    }
    
    usersList.innerHTML = filteredUsers.map(user => {
        const userClothing = clothing.filter(item => item.userId === user.id);
        const totalItems = userClothing.length;
        const soldItems = userClothing.filter(item => item.status === 'vendido').length;
        const pendingItems = userClothing.filter(item => item.status === 'pendiente').length;
        const paidItems = userClothing.filter(item => item.status === 'pagado').length;
        
        return `
            <div class="user-card">
                <div class="user-info">
                    <div>
                        <div class="user-name" onclick="goToUserDetail(${user.id})" style="cursor: pointer; color: #3498db;">${user.name}</div>
                        <div class="user-phone">${user.phone || 'Sin teléfono'}</div>
                    </div>
                    <div>
                        <button class="edit-btn" onclick="openAddClothingModal(${user.id})">Agregar Prenda</button>
                        <button class="delete-btn" onclick="deleteUser(${user.id})">Eliminar</button>
                    </div>
                </div>
                <div class="summary-stats">
                    <div class="stat-box">
                        <div class="stat-value">${totalItems}</div>
                        <div class="stat-label">Prendas totales</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${soldItems}</div>
                        <div class="stat-label">Vendidas (sin pagar)</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${paidItems}</div>
                        <div class="stat-label">Pagadas</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${pendingItems}</div>
                        <div class="stat-label">Pendientes</div>
                    </div>
                </div>
                ${userClothing.length > 0 ? `
                    <div style="margin-top: 15px; text-align: center;">
                        <button class="edit-btn" onclick="goToUserDetail(${user.id})">Ver Detalles (${userClothing.length} prendas)</button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function loadUserOptions() {
    const select = document.getElementById('clothingUser');
    select.innerHTML = '<option value="">Seleccionar usuario</option>';
    
    users.forEach(user => {
        select.innerHTML += `<option value="${user.id}">${user.name}</option>`;
    });
}

function deleteUser(userId) {
    if (confirm('¿Estás seguro de eliminar este usuario y todas sus prendas?')) {
        users = users.filter(user => user.id !== userId);
        clothing = clothing.filter(item => item.userId !== userId);
        saveData();
        loadUsers();
        loadUserOptions();
        loadSummary();
    }
}

// Funciones de prendas
function addClothing(e) {
    e.preventDefault();
    
    const userId = parseInt(document.getElementById('clothingUser').value);
    const description = document.getElementById('clothingItem').value.trim();
    const salePrice = parseFloat(document.getElementById('salePrice').value);
    const userPrice = parseFloat(document.getElementById('userPrice').value);
    const status = document.getElementById('clothingStatus').value;
    
    if (!userId || !description || !salePrice || !userPrice) return;
    
    const item = {
        id: Date.now(),
        userId: userId,
        description: description,
        salePrice: salePrice,
        userPrice: userPrice,
        status: status,
        createdAt: new Date().toLocaleDateString()
    };
    
    clothing.push(item);
    saveData();
    loadUsers();
    loadSummary();
    
    // Limpiar formulario
    document.getElementById('clothingForm').reset();
    
    alert('Prenda agregada correctamente');
}

function deleteClothing(itemId) {
    if (confirm('¿Estás seguro de eliminar esta prenda?')) {
        clothing = clothing.filter(item => item.id !== itemId);
        saveData();
        loadUsers();
        loadSummary();
    }
}

// Funciones de edición
function openEditModal(itemId) {
    const item = clothing.find(c => c.id === itemId);
    if (!item) return;
    
    document.getElementById('editItemId').value = item.id;
    document.getElementById('editDescription').value = item.description;
    document.getElementById('editSalePrice').value = item.salePrice;
    document.getElementById('editUserPrice').value = item.userPrice;
    document.getElementById('editStatus').value = item.status;
    
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function updateClothing(e) {
    e.preventDefault();
    
    const itemId = parseInt(document.getElementById('editItemId').value);
    const description = document.getElementById('editDescription').value.trim();
    const salePrice = parseFloat(document.getElementById('editSalePrice').value);
    const userPrice = parseFloat(document.getElementById('editUserPrice').value);
    const status = document.getElementById('editStatus').value;
    
    if (!description || !salePrice || !userPrice) return;
    
    const itemIndex = clothing.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        clothing[itemIndex] = {
            ...clothing[itemIndex],
            description: description,
            salePrice: salePrice,
            userPrice: userPrice,
            status: status
        };
        
        saveData();
        loadUsers();
        loadSummary();
        closeEditModal();
    }
}

// Funciones para agregar prenda rápida
function openAddClothingModal(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    document.getElementById('addClothingTitle').textContent = `Agregar Prenda - ${user.name}`;
    document.getElementById('quickUserId').value = userId;
    document.getElementById('quickClothingForm').reset();
    document.getElementById('quickUserId').value = userId; // Restaurar después del reset
    
    document.getElementById('addClothingModal').style.display = 'block';
}

function closeAddClothingModal() {
    document.getElementById('addClothingModal').style.display = 'none';
}

function addQuickClothing(e) {
    e.preventDefault();
    
    const userId = parseInt(document.getElementById('quickUserId').value);
    const description = document.getElementById('quickDescription').value.trim();
    const salePrice = parseFloat(document.getElementById('quickSalePrice').value);
    const userPrice = parseFloat(document.getElementById('quickUserPrice').value);
    const status = document.getElementById('quickStatus').value;
    
    if (!userId || !description || !salePrice || !userPrice) return;
    
    const item = {
        id: Date.now(),
        userId: userId,
        description: description,
        salePrice: salePrice,
        userPrice: userPrice,
        status: status,
        createdAt: new Date().toLocaleDateString()
    };
    
    clothing.push(item);
    saveData();
    loadUsers();
    loadSummary();
    closeAddClothingModal();
}

// Función para ir al detalle del usuario
function goToUserDetail(userId) {
    window.location.href = `user-detail.html?userId=${userId}`;
}

// Funciones de estadísticas
function populateFilters() {
    const monthFilter = document.getElementById('monthFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    // Poblar meses
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    months.forEach((month, index) => {
        monthFilter.innerHTML += `<option value="${index + 1}">${month}</option>`;
    });
    
    // Poblar años (dinámico: año actual hasta año actual + 10)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 10; year++) {
        yearFilter.innerHTML += `<option value="${year}">${year}</option>`;
    }
}

function loadStatistics() {
    const selectedMonth = document.getElementById('monthFilter').value;
    const selectedYear = document.getElementById('yearFilter').value;
    
    // Filtrar prendas vendidas por fecha de venta (usar soldAt si existe, sino createdAt)
    let filteredClothing = clothing.filter(item => item.status === 'vendido' || item.status === 'pagado');
    
    if (selectedMonth || selectedYear) {
        filteredClothing = filteredClothing.filter(item => {
            // Usar soldAt si existe, sino createdAt
            const dateToUse = item.soldAt || item.createdAt;
            const dateParts = dateToUse.split('/');
            const itemDay = parseInt(dateParts[0]);
            const itemMonth = parseInt(dateParts[1]);
            const itemYear = parseInt(dateParts[2]);
            
            let matchMonth = !selectedMonth || itemMonth == selectedMonth;
            let matchYear = !selectedYear || itemYear == selectedYear;
            
            return matchMonth && matchYear;
        });
    }
    
    loadSalesStats(filteredClothing);
    loadTopUsers(filteredClothing);
    loadStockStats();
    loadFinancialStats(filteredClothing);
}

function loadSalesStats(filteredClothing) {
    const soldItems = filteredClothing; // Ya vienen filtradas solo vendidas/pagadas
    const totalSales = soldItems.reduce((sum, item) => sum + item.salePrice, 0);
    const totalItems = soldItems.length;
    const avgSale = totalItems > 0 ? totalSales / totalItems : 0;
    
    document.getElementById('salesStats').innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Prendas vendidas</span>
            <span class="stat-value stat-highlight">${totalItems}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Total facturado</span>
            <span class="stat-value stat-highlight">$${totalSales.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Venta promedio</span>
            <span class="stat-value">$${avgSale.toFixed(2)}</span>
        </div>
    `;
}

function loadTopUsers(filteredClothing) {
    const userSales = {};
    
    filteredClothing.forEach(item => { // Ya vienen filtradas solo vendidas/pagadas
        const user = users.find(u => u.id === item.userId);
        if (user) {
            if (!userSales[user.name]) {
                userSales[user.name] = { count: 0, total: 0 };
            }
            userSales[user.name].count++;
            userSales[user.name].total += item.salePrice;
        }
    });
    
    const sortedUsers = Object.entries(userSales)
                             .sort((a, b) => b[1].count - a[1].count)
                             .slice(0, 5);
    
    if (sortedUsers.length === 0) {
        document.getElementById('topUsers').innerHTML = '<p>No hay ventas en el período seleccionado</p>';
        return;
    }
    
    document.getElementById('topUsers').innerHTML = sortedUsers.map(([userName, data], index) => {
        const shortName = userName.length > 15 ? userName.substring(0, 15) + '...' : userName;
        return `
        <div class="stat-item">
            <span class="stat-label" title="${userName}">${index + 1}. ${shortName}</span>
            <span class="stat-value">${data.count} ($${data.total.toFixed(0)})</span>
        </div>
    `}).join('');
}

function loadStockStats() {
    const pendingItems = clothing.filter(item => item.status === 'pendiente');
    const totalStock = pendingItems.length;
    const stockValue = pendingItems.reduce((sum, item) => sum + item.salePrice, 0);
    
    const userStock = {};
    pendingItems.forEach(item => {
        const user = users.find(u => u.id === item.userId);
        if (user) {
            userStock[user.name] = (userStock[user.name] || 0) + 1;
        }
    });
    
    const topStockUser = Object.entries(userStock).sort((a, b) => b[1] - a[1])[0];
    
    document.getElementById('stockStats').innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Prendas disponibles</span>
            <span class="stat-value stat-highlight">${totalStock}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Valor del stock</span>
            <span class="stat-value stat-highlight">$${stockValue.toFixed(0)}</span>
        </div>
        ${topStockUser ? `
        <div class="stat-item">
            <span class="stat-label" title="${topStockUser[0]}">Mayor stock: ${topStockUser[0].length > 12 ? topStockUser[0].substring(0, 12) + '...' : topStockUser[0]}</span>
            <span class="stat-value">${topStockUser[1]} prendas</span>
        </div>
        ` : ''}
    `;
}

function loadFinancialStats(filteredClothing) {
    const soldItems = filteredClothing; // Ya vienen filtradas solo vendidas/pagadas
    const totalSales = soldItems.reduce((sum, item) => sum + item.salePrice, 0);
    const totalCommissions = soldItems.reduce((sum, item) => sum + item.userPrice, 0);
    const totalProfit = totalSales - totalCommissions;
    
    const pendingPayments = clothing.filter(item => item.status === 'vendido')
                                   .reduce((sum, item) => sum + item.userPrice, 0);
    
    document.getElementById('financialStats').innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Ingresos totales</span>
            <span class="stat-value stat-highlight">$${totalSales.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Comisiones pagadas</span>
            <span class="stat-value">$${totalCommissions.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Ganancia neta</span>
            <span class="stat-value stat-highlight">$${totalProfit.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Pendiente de pago</span>
            <span class="stat-value">$${pendingPayments.toFixed(2)}</span>
        </div>
    `;
}

// Función de resumen
function loadSummary() {
    const summaryList = document.getElementById('summaryList');
    
    if (users.length === 0) {
        summaryList.innerHTML = '<p>No hay datos para mostrar</p>';
        return;
    }
    
    const summary = users.map(user => {
        const userClothing = clothing.filter(item => item.userId === user.id);
        const soldItems = userClothing.filter(item => item.status === 'vendido');
        const pendingItems = userClothing.filter(item => item.status === 'pendiente');
        const paidItems = userClothing.filter(item => item.status === 'pagado');
        
        const totalSaleValue = [...soldItems, ...paidItems].reduce((sum, item) => sum + item.salePrice, 0);
        const totalUserValue = [...soldItems, ...paidItems].reduce((sum, item) => sum + item.userPrice, 0);
        const profit = totalSaleValue - totalUserValue;
        
        const pendingSaleValue = soldItems.reduce((sum, item) => sum + item.userPrice, 0);
        const potentialSaleValue = pendingItems.reduce((sum, item) => sum + item.salePrice, 0);
        const potentialUserValue = pendingItems.reduce((sum, item) => sum + item.userPrice, 0);
        const potentialProfit = potentialSaleValue - potentialUserValue;
        
        return {
            user,
            totalItems: userClothing.length,
            soldItems: soldItems.length,
            pendingItems: pendingItems.length,
            paidItems: paidItems.length,
            totalSaleValue,
            totalUserValue,
            profit,
            pendingSaleValue,
            potentialSaleValue,
            potentialUserValue,
            potentialProfit
        };
    });
    
    summaryList.innerHTML = summary.map(data => `
        <div class="summary-card">
            <h3>${data.user.name}</h3>
            <div class="summary-stats">
                <div class="stat-box">
                    <div class="stat-value">${data.totalItems}</div>
                    <div class="stat-label">Total prendas</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${data.soldItems}</div>
                    <div class="stat-label">Vendidas</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${data.soldItems}</div>
                    <div class="stat-label">Vendidas (sin pagar)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${data.paidItems}</div>
                    <div class="stat-label">Pagadas</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${data.pendingItems}</div>
                    <div class="stat-label">Pendientes</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">$${data.pendingSaleValue.toFixed(2)}</div>
                    <div class="stat-label">Por pagar al usuario</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">$${data.profit.toFixed(2)}</div>
                    <div class="stat-label">Ganancia total</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para filtrar usuarios
function filterUsers() {
    loadUsers();
}

// Función para guardar datos
function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('clothing', JSON.stringify(clothing));
}