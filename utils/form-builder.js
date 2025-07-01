// Form builder utility document.createDocumentFragment() for large DOM inserts
// example of how to efficiently build UIs dynamically

export class FormBuilder {
  constructor(container) {
    this.container = container;
  }

  // Build a form with multiple fields using document fragment for performance
  buildForm(fields) {
    const fragment = document.createDocumentFragment();
    const form = document.createElement('form');
    
    // Create all form elements in the fragment first
    fields.forEach(field => {
      const fieldContainer = this.createField(field);
      fragment.appendChild(fieldContainer);
    });
    
    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Submit';
    submitBtn.className = 'submit-btn';
    fragment.appendChild(submitBtn);
    
    // Append all elements to form at once
    form.appendChild(fragment);
    
    // Finally append the complete form to container
    this.container.appendChild(form);
    
    return form;
  }

  // Create individual field elements
  createField(field) {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container';
    
    const label = document.createElement('label');
    label.textContent = field.label;
    label.setAttribute('for', field.id);
    
    let input;
    switch (field.type) {
      case 'textarea':
        input = document.createElement('textarea');
        break;
      case 'select':
        input = document.createElement('select');
        if (field.options) {
          // Use fragment for multiple options
          const optionsFragment = document.createDocumentFragment();
          field.options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option.value;
            optionEl.textContent = option.text;
            optionsFragment.appendChild(optionEl);
          });
          input.appendChild(optionsFragment);
        }
        break;
      default:
        input = document.createElement('input');
        input.type = field.type || 'text';
    }
    
    input.id = field.id;
    input.name = field.name || field.id;
    if (field.placeholder) input.placeholder = field.placeholder;
    if (field.required) input.required = true;
    
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    
    return fieldContainer;
  }

  // Build a large list efficiently using document fragment
  buildList(items, container) {
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.text;
      if (item.className) li.className = item.className;
      fragment.appendChild(li);
    });
    
    ul.appendChild(fragment);
    container.appendChild(ul);
    
    return ul;
  }

  // Build a table with many rows efficiently
  buildTable(data, headers, container) {
    const fragment = document.createDocumentFragment();
    const table = document.createElement('table');
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headerFragment = document.createDocumentFragment();
    
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerFragment.appendChild(th);
    });
    
    headerRow.appendChild(headerFragment);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body with fragment for performance
    const tbody = document.createElement('tbody');
    const bodyFragment = document.createDocumentFragment();
    
    data.forEach(row => {
      const tr = document.createElement('tr');
      const rowFragment = document.createDocumentFragment();
      
      Object.values(row).forEach(cellData => {
        const td = document.createElement('td');
        td.textContent = cellData;
        rowFragment.appendChild(td);
      });
      
      tr.appendChild(rowFragment);
      bodyFragment.appendChild(tr);
    });
    
    tbody.appendChild(bodyFragment);
    table.appendChild(tbody);
    container.appendChild(table);
    
    return table;
  }
}

// example usage:
// builder.buildForm([
//   { id: 'name', label: 'Name', type: 'text', required: true },
//   { id: 'email', label: 'Email', type: 'email', required: true },
//   { id: 'message', label: 'Message', type: 'textarea' }
// ]);