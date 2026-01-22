// Obtener datos del localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let clothing = JSON.parse(localStorage.getItem('clothing')) || [];
let currentUserId = null;

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Obtener userId de la URL
    const urlParams = new URLSearchParams(window.location.search);
    currentUserId = parseInt(urlParams.get('userId'));
    
    if (!currentUserId) {
        alert('Usuario no encontrado');
        goBack();
        return;
    }
    
    loadUserDetail();
    
    // Event listeners
    document.getElementById('quickClothingForm').addEventListener('submit', addQuickClothing);
    document.getElementById('editForm').addEventListener('submit', updateClothing);
    document.getElementById('addClothingBtn').addEventListener('click', () => openAddClothingModal(currentUserId));
});

function loadUserDetail() {
    const user = users.find(u => u.id === currentUserId);
    if (!user) {
        alert('Usuario no encontrado');
        goBack();
        return;
    }
    
    // Actualizar título
    document.getElementById('userTitle').textContent = `${user.name}`;
    
    // Mostrar info del usuario
    const userClothing = clothing.filter(item => item.userId === currentUserId);
    const soldItems = userClothing.filter(item => item.status === 'vendido');
    const pendingItems = userClothing.filter(item => item.status === 'pendiente');
    const paidItems = userClothing.filter(item => item.status === 'pagado');
    
    const totalSaleValue = [...soldItems, ...paidItems].reduce((sum, item) => sum + item.salePrice, 0);
    const totalUserValue = [...soldItems, ...paidItems].reduce((sum, item) => sum + item.userPrice, 0);
    const profit = totalSaleValue - totalUserValue;
    const pendingPayment = soldItems.reduce((sum, item) => sum + item.userPrice, 0);
    
    document.getElementById('userInfo').innerHTML = `
        <div>
            <h2>${user.name}</h2>
            <p style="cursor: pointer; color: #667eea;" onclick="editUserPhone(${user.id})" title="Haz clic para editar">${user.phone || 'Sin teléfono - Haz clic para agregar'}</p>
            <div class="summary-stats" style="margin-top: 15px;">
                <div class="stat-box">
                    <div class="stat-value">${userClothing.length}</div>
                    <div class="stat-label">Total prendas</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${soldItems.length}</div>
                    <div class="stat-label">Vendidas (sin pagar)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${paidItems.length}</div>
                    <div class="stat-label">Pagadas</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${pendingItems.length}</div>
                    <div class="stat-label">Pendientes</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">$${pendingPayment.toFixed(2)}</div>
                    <div class="stat-label">Por pagar al usuario</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">$${profit.toFixed(2)}</div>
                    <div class="stat-label">Ganancia total</div>
                </div>
            </div>
        </div>
    `;
    
    // Mostrar prendas
    loadClothingList();
}

function loadClothingList() {
    const userClothing = clothing.filter(item => item.userId === currentUserId);
    const clothingList = document.getElementById('clothingList');
    
    if (userClothing.length === 0) {
        clothingList.innerHTML = '<p>No hay prendas registradas para este usuario.</p>';
        return;
    }
    
    clothingList.innerHTML = userClothing.map(item => {
        const ganancia = (item.status === 'vendido' || item.status === 'pagado') ? (item.salePrice - item.userPrice) : 0;
        return `
            <div class="clothing-item ${item.status}">
                <div class="item-info">
                    <div class="item-description">${item.description}</div>
                    <div class="item-prices">
                        Venta: $${item.salePrice} | Usuario: $${item.userPrice}
                        ${(item.status === 'vendido' || item.status === 'pagado') ? `| <span class="${ganancia >= 0 ? 'ganancia-positiva' : 'ganancia-negativa'}">Ganancia: $${ganancia.toFixed(2)}</span>` : ''}
                    </div>
                    <div style="font-size: 0.8em; color: #7f8c8d; margin-top: 5px;">
                        Agregado: ${item.createdAt}
                        ${(item.status === 'vendido' || item.status === 'pagado') ? `<br>Vendido: ${item.soldAt || item.createdAt}` : ''}
                        ${item.status === 'pagado' ? `<br>Pagado: ${item.paidAt || item.soldAt || item.createdAt}` : ''}
                    </div>
                </div>
                <div>
                    <span class="item-status status-${item.status}">${item.status === 'pagado' ? 'pagado' : item.status}</span>
                    <button class="edit-btn" onclick="openEditModal(${item.id})">Editar</button>
                    <button class="delete-btn" onclick="deleteClothing(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
    }).join('');
}

// Funciones de navegación
function goBack() {
    window.location.href = 'index.html';
}

// Funciones para agregar prenda
function openAddClothingModal(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    document.getElementById('addClothingTitle').textContent = `Agregar Prenda - ${user.name}`;
    document.getElementById('quickUserId').value = userId;
    document.getElementById('quickClothingForm').reset();
    document.getElementById('quickUserId').value = userId;
    
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
        createdAt: new Date().toLocaleDateString(),
        soldAt: (status === 'vendido' || status === 'pagado') ? new Date().toLocaleDateString() : null,
        paidAt: status === 'pagado' ? new Date().toLocaleDateString() : null
    };
    
    clothing.push(item);
    saveData();
    loadUserDetail();
    closeAddClothingModal();
}

// Funciones para editar prenda
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
            status: status,
            soldAt: (status === 'vendido' || status === 'pagado') && clothing[itemIndex].status === 'pendiente' ? 
                   new Date().toLocaleDateString('es-ES') : 
                   (status === 'pendiente' ? null : clothing[itemIndex].soldAt),
            paidAt: status === 'pagado' && clothing[itemIndex].status !== 'pagado' ? 
                   new Date().toLocaleDateString('es-ES') : 
                   (status !== 'pagado' ? null : clothing[itemIndex].paidAt)
        };
        
        saveData();
        loadUserDetail();
        closeEditModal();
    }
}

function deleteClothing(itemId) {
    if (confirm('¿Estás seguro de eliminar esta prenda?')) {
        clothing = clothing.filter(item => item.id !== itemId);
        saveData();
        loadUserDetail();
    }
}

// Función para editar teléfono del usuario
function editUserPhone(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    const newPhone = prompt('Ingresa el nuevo teléfono:', user.phone || '');
    if (newPhone !== null) {
        user.phone = newPhone.trim();
        saveData();
        loadUserDetail();
    }
}

// Función para guardar datos
function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('clothing', JSON.stringify(clothing));
}