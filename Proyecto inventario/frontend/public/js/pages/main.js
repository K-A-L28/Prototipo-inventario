document.addEventListener('DOMContentLoaded', function() {
    const toggleWidgetsBtn = document.getElementById('toggleWidgetsBtn');
    const widgetsSection = document.getElementById('widgets-cards');
    const arrow = document.getElementById('arrow');

    // Toggle widgets visibility
    function toggleWidgets() {
        arrow.classList.toggle("rotated");
        widgetsSection.classList.toggle('hidden');
    }

    toggleWidgetsBtn.addEventListener('click', toggleWidgets);


    // Rest of your widget data loading code...
    function loadWidgetsData() {
        // Your existing data loading code
        const data = {
            totalInventories: 5,
            totalItems: 1245,
            totalValue: 12500.75
        };

        document.getElementById('totalInventories').textContent = data.totalInventories;
        document.getElementById('totalItems').textContent = data.totalItems.toLocaleString();
        document.getElementById('totalValue').textContent = `$${data.totalValue.toLocaleString('es-CO')}`;
    }

    loadWidgetsData();
});