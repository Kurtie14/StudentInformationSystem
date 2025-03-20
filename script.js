document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.getElementById("studentTable");

    let students = [];

    // Add Student
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const studentId = document.getElementById("studentId").value;
        const contact = document.getElementById("contact").value;
        const course = document.getElementById("course").value;

        if (name && studentId && contact && course) {
            const student = { name, studentId, contact, course };
            students.push(student);
            renderTable();
            studentForm.reset();
        } else {
            alert("Please fill in all fields.");
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

        deleteStudent(index);
    };

    // Delete Student
    window.deleteStudent = function (index) {
        students.splice(index, 1);
        renderTable();
    };
});
