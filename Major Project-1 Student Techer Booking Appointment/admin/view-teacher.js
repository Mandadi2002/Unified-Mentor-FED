  // Display appointments from local storage
  function displayTeacherlist() {
    let teacherlist = JSON.parse(localStorage.getItem('teacherlist')) || [];
    let tableBody = document.getElementById('teachers-list');
    tableBody.innerHTML = ''; // Clear existing rows

    Teacherlist.forEach((appointment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${admin.teacherName}</td>
            <td>${admin.departmentName}</td>
            <td>${admin.subjectName}</td>
            
            <td>${admin.status}</td>
            <td>
                <button onclick="approveTeacher(${index})">Approve</button>
                <button onclick="deleteTeacher(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to approve appointment
function approveTeacherlist(index) {
    let Teacherlist = JSON.parse(localStorage.getItem('teacherlist')) || [];
    
    // Update appointment status to "Approved"
    Teacherlist[index].status = 'Approved';
    
    // Update local storage
    localStorage.setItem('teacherlist', JSON.stringify(appointments));
    
    // Re-display appointments
    displayTeacherlist();
}

// Function to delete appointment
function deleteTeacherlist(index) {
    let appointments = JSON.parse(localStorage.getItem('teacherlist')) || [];
    
    // Remove appointment from array
    Teacherlist.splice(index, 1);
    
    // Update local storage
    localStorage.setItem('teacherlist', JSON.stringify(teacherlist));
    
    // Re-display appointments
    displayTeacherlist();
}
// Call displayAppointments when the page loads
displayATeacherlist();


  