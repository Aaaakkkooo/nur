// script.js
document.addEventListener('DOMContentLoaded', () => {
    const labs = [
        { title: 'Lab 1', description: 'Description for Lab 1' },
        { title: 'Lab 2', description: 'Description for Lab 2' },
        { title: 'Lab 3', description: 'Description for Lab 3' },
    ];

    const labForm = document.getElementById('lab-form');
    const labsList = document.getElementById('labs');
    const pythonCodeTextarea = document.getElementById('python-code');

    labForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        const lab = { title, description };

        labs.push(lab);
        updateLabsList();

        labForm.reset();
    });

    function updateLabsList() {
        labsList.innerHTML = '';

        labs.forEach((lab, index) => {
            const labItem = document.createElement('li');
            labItem.innerHTML = `
                <h3>${lab.title}</h3>
                <p>${lab.description}</p>
                <button class="delete-lab" data-index="${index}">Delete</button>
            `;
            labsList.appendChild(labItem);
        });

        const deleteButtons = document.querySelectorAll('.delete-lab');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                labs.splice(index, 1);
                updateLabsList();
            });
        });
    }

    updateLabsList();

    document.getElementById('run-python').addEventListener('click', () => {
        const code = pythonCodeTextarea.value;
        runPythonCode(code).then(result => {
            document.getElementById('python-output').textContent = result;
        }).catch(error => {
            document.getElementById('python-output').textContent = `Error: ${error.message}`;
        });
    });

    async function runPythonCode(code) {
        const response = await fetch('https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js');
        const pythonInterpreterCode = await response.text();

        eval(pythonInterpreterCode);

        await languagePluginLoader;

        const result = await pyodide.runPythonAsync(code);
        return result;
    }
});
