
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('reportSearch');
            const tableBody = document.getElementById('reportTableBody');
            const rows = tableBody.getElementsByTagName('tr');
            const noResults = document.getElementById('noResults');
            
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase().trim();
                let hasVisibleRows = false;
                
                // Loop through all table rows
                for (let row of rows) {
                    const cells = row.getElementsByTagName('td');
                    let rowText = '';
                    
                    // Collect text from all cells except the action column (last one)
                    for (let i = 0; i < cells.length - 1; i++) {
                        rowText += cells[i].textContent.toLowerCase() + ' ';
                    }
                    
                    // Check if search term exists in row text
                    if (searchTerm === '' || rowText.includes(searchTerm)) {
                        row.style.display = '';
                        hasVisibleRows = true;
                    } else {
                        row.style.display = 'none';
                    }
                }
                
                // Show/hide no results message
                if (hasVisibleRows || searchTerm === '') {
                    noResults.style.display = 'none';
                } else {
                    noResults.style.display = 'block';
                }
            });
            
            // Add a clear button functionality (optional)
            searchInput.insertAdjacentHTML('afterend', 
                '<button id="clearSearch" class="btn btn-link position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%); display: none;">' +
                '<i class="mdi mdi-close"></i>' +
                '</button>'
            );
            
            const clearBtn = document.getElementById('clearSearch');
            
            searchInput.addEventListener('input', function() {
                clearBtn.style.display = this.value ? 'block' : 'none';
            });
            
            clearBtn.addEventListener('click', function() {
                searchInput.value = '';
                searchInput.focus();
                clearBtn.style.display = 'none';
                
                // Trigger the search to show all rows
                searchInput.dispatchEvent(new Event('input'));
            });
        });
    