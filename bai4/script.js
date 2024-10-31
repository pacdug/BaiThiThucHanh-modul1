class Worker {
    constructor(stt, name, dob, address, salary, position) {
        this.stt = stt;
        this.name = name;
        this.dob = dob;
        this.address = address;
        this.salary = salary;
        this.position = position;
    }
}

let workers = [
    new Worker(1, "Nguyen Van A", "1990-01-01", "Ha Noi", 5000000, "Công nhân"),
    new Worker(2, "Tran Thi B", "1992-02-02", "Hai Phong", 6000000, "Quản lý"),
    new Worker(3, "Le Van C", "1985-03-03", "Da Nang", 5500000, "Kỹ thuật viên"),
];


function displayWorkers() {
    let tableBody = document.querySelector('#workerTable tbody');
    tableBody.innerHTML = '';

    for (let i = 0; i < workers.length; i++) {
        let worker = workers[i];
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${worker.stt}</td>
            <td>${worker.name}</td>
            <td>${worker.dob}</td>
            <td>${worker.address}</td>
            <td>${worker.salary}</td>
            <td>${worker.position}</td>
            <td>
                <button onclick="editWorker(${worker.stt})">Sửa</button>
                <button onclick="deleteWorker(${worker.stt})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

function addWorker() {
    let name = document.getElementById('name').value;
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value;
    let salary = document.getElementById('salary').value;
    let position = document.getElementById('position').value;

    let newWorker = new Worker(workers.length + 1, name, dob, address, salary, position);
    workers.push(newWorker);
    displayWorkers();
}

function editWorker(stt) {
    let worker = null;
    for (let i = 0; i < workers.length; i++) {
        if (workers[i].stt === stt) {
            worker = workers[i];
            break;
        }
    }

    if (worker) {
        document.getElementById('name').value = worker.name;
        document.getElementById('dob').value = worker.dob;
        document.getElementById('address').value = worker.address;
        document.getElementById('salary').value = worker.salary;
        document.getElementById('position').value = worker.position;

        document.querySelector('button[onclick^="addWorker"]').style.display = 'none';
        let saveButton = document.createElement('button');
        saveButton.textContent = 'Lưu';
        saveButton.setAttribute('onclick', `saveWorker(${stt})`);
        document.getElementById('workerForm').appendChild(saveButton);
    }
}

function saveWorker(stt) {
    let worker = null;
    for (let i = 0; i < workers.length; i++) {
        if (workers[i].stt === stt) {
            worker = workers[i];
            break;
        }
    }

    if (worker) {
        worker.name = document.getElementById('name').value;
        worker.dob = document.getElementById('dob').value;
        worker.address = document.getElementById('address').value;
        worker.salary = document.getElementById('salary').value;
        worker.position = document.getElementById('position').value;

        displayWorkers();

        document.querySelector('button[onclick^="addWorker"]').style.display = 'inline';
        document.querySelector('button[onclick^="saveWorker"]').remove();
    }
}

function deleteWorker(stt) {
    for (let i = 0; i < workers.length; i++) {
        if (workers[i].stt === stt) {
            workers.splice(i, 1);
            break;
        }
    }
    displayWorkers();
}

workers.sort((a, b) => a.name.localeCompare(b.name));

window.onload = displayWorkers;
