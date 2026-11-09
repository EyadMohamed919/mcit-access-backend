document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.table-filter');
    const tableRows = document.querySelectorAll('.data-table tbody tr:not(:has(.empty-state))');
    const clearBtn = document.getElementById('clear-filters');

    function applyFilters() {
        tableRows.forEach(row => {
            let isRowVisible = true;

            filters.forEach(filter => {
                const colIndex = filter.getAttribute('data-col-index');
                const filterValue = filter.value.toLowerCase().trim();

                if (filterValue !== '') {
                    const cell = row.cells[colIndex];
                    if (cell) {
                        const cellText = cell.textContent.toLowerCase().trim();
                        
                        if (!cellText.includes(filterValue)) {
                            isRowVisible = false;
                        }
                    }
                }
            });

            row.style.display = isRowVisible ? '' : 'none';
        });
    }

    filters.forEach(filter => {
        filter.addEventListener('input', applyFilters);
        filter.addEventListener('change', applyFilters); // Supports <select> dropdowns too
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            filters.forEach(filter => filter.value = '');
            applyFilters(); // Reset table view
        });
    }
});