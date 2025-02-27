export function populateSelect(selectId, items) {
     const selectElement = document.getElementById(selectId);
     items.forEach(item => {
       const option = document.createElement('option');
       option.value = item;
       option.textContent = item;
       selectElement.appendChild(option);
     });
   }