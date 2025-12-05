document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('inventoryModal');
    const openModalBtn = document.querySelector('.card-add');
    const closeModalBtn = document.querySelector('.close-button');
    const cancelBtn = document.getElementById('cancelButton');
    const form = document.getElementById('inventoryForm');

    // Open modal
    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        form.reset(); // Reset form
    }

    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close when clicking outside modal
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inventoryType = document.getElementById('inventoryType').value;
        const inventoryName = document.getElementById('inventoryName').value;

        // Here you would typically send this data to your server
        console.log('Nuevo inventario:', {
            type: inventoryType,
            name: inventoryName
        });

        // Show success message
        alert('¡Inventario creado exitosamente!');
        
        // Close modal
        closeModal();
        
        // Here you would typically refresh the inventory list or add the new item to the UI
    });
});