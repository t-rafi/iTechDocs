
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

        
const tableBody = document.getElementById('reportTableBody');

fetch('Report-Json/report.json')
  .then(response => response.json())
  .then(data => {
    let index = 1;
    for (const moduleName in data) {
      const reports = data[moduleName];
      reports.forEach(report => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${index++}</td>
          <td>${moduleName}</td>
          <td>${report.page}</td>
          <td>${report.url}</td>
          <td>${report.name}</td>
          <td>${report.createdBy}</td>
          <td>${report.date}</td>
          <td>
            <a href="${report.file}" target="_blank" class="btn btn-xm">
              <i class="mdi mdi-file-pdf text-danger" title="View Report"></i>
            </a>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }
  })
  .catch(error => console.error('Error loading reports:', error));
