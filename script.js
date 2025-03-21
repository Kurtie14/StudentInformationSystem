document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.getElementById("studentTable");
    const submitButton = document.querySelector("button[type='submit']");
    const clearButton = document.querySelector("button[type='reset']");
    
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let editIndex = null;

    function showModal(title, message) {
        document.getElementById("alertModalTitle").textContent = title;
        document.getElementById("alertModalBody").textContent = message;
        new bootstrap.Modal(document.getElementById("alertModal")).show();
    }

    function saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    function renderTable() {
        studentTable.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.contact}</td>
                <td>${student.course}</td>
                <td>
                    <button class="btn btn-warning me-2" onclick="editStudent(${index})">✏️ Edit</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${index})">🗑️ Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
        saveToLocalStorage();
    }
    document.getElementById("toggleForm").addEventListener("click", function() {
        var formContainer = document.getElementById("formContainer");
        var buttonContainer = document.getElementById("buttonContainer");
    
        if (formContainer.style.display === "none") {
            formContainer.style.display = "block";
            buttonContainer.classList.remove("button-right");
            this.textContent = "Hide Form";
        } else {
            formContainer.style.display = "none";
            buttonContainer.classList.add("button-right");
            this.textContent = "Show Form";
        }
    });
    
    document.getElementById("searchInput").addEventListener("keyup", function () {
        let filter = this.value.toLowerCase();
        let rows = document.querySelectorAll("#studentTable tr");
    
        rows.forEach(row => {
            let text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });
    });

    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const course = document.getElementById("course").value.trim();

        if (!name || !studentId || !contact || !course) {
            showModal("⚠️ Warning", "Please fill in all fields.");
            return;
        }

        if (!/^\d{11}$/.test(contact)) {
            showModal("⚠️ Warning", "Please enter a valid 11-digit contact number.");
            return;
        }

        if (editIndex === null && students.some(student => student.studentId === studentId)) {
            showModal("⚠️ Warning", "A student with this ID already exists.");
            return;
        }

        const student = { name, studentId, contact, course };

        if (editIndex === null) {
            students.push(student);
            showModal("✅ Success", "Student added successfully!");
        } else {
            students[editIndex] = student;
            editIndex = null;
            submitButton.textContent = "Add Student";
            showModal("✏️ Updated", "Student record updated successfully!");
        }

        renderTable();
        studentForm.reset();
    });

    window.editStudent = function (index) {
        const student = students[index];

        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.studentId;
        document.getElementById("contact").value = student.contact;
        document.getElementById("course").value = student.course;

        editIndex = index;
        submitButton.textContent = "Update Student";
        showModal("✏️ Edit Mode", "Update the fields and click 'Update Student' to save changes.");
    };

    window.deleteStudent = function (index) {
        if (confirm("❌ Are you sure you want to delete this student?")) {
            students.splice(index, 1);
            renderTable();
            showModal("🗑️ Deleted", "Student record deleted.");
        }
    };

    clearButton.addEventListener("click", function () {
        editIndex = null;
        submitButton.textContent = "Add Student";
    });

    renderTable();
});
