document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.getElementById("studentTable");

    let students = [];
    let editIndex = null; // Track index of student being edited

    // Function to show Bootstrap Modal
    function showModal(title, message) {
        document.getElementById("alertModalTitle").textContent = title;
        document.getElementById("alertModalBody").textContent = message;
        new bootstrap.Modal(document.getElementById("alertModal")).show();
    }

    // Add or Update Student
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const studentId = document.getElementById("studentId").value;
        const contact = document.getElementById("contact").value;
        const course = document.getElementById("course").value;

        if (name && studentId && contact && course) {
            const student = { name, studentId, contact, course };

            if (editIndex === null) {
                // Add New Student
                students.push(student);
                showModal("✅ Success", "Student added successfully!");
            } else {
                // Update Existing Student
                students[editIndex] = student;
                editIndex = null; // Reset edit mode
                showModal("✏️ Updated", "Student record updated successfully!");
            }

            renderTable();
            studentForm.reset();
        } else {
            showModal("⚠️ Warning", "Please fill in all fields.");
        }
    });

    // Render Table
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
                    <button class="btn btn-warning" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;

            studentTable.appendChild(row);
        });
    }

    // Edit Student
    window.editStudent = function (index) {
        const student = students[index];

        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.studentId;
        document.getElementById("contact").value = student.contact;
        document.getElementById("course").value = student.course;

        editIndex = index; // Set edit index
        showModal("✏️ Edit Mode", "Update the fields and click 'Add Student' to save changes.");
    };

    // Delete Student
    window.deleteStudent = function (index) {
        const confirmDelete = confirm("❌ Are you sure you want to delete this student?");
        if (confirmDelete) {
            students.splice(index, 1);
            renderTable();
            showModal("🗑️ Deleted", "Student record deleted.");
        }
    };
});
