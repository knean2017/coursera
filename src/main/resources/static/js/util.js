function selectRole(role) {
    localStorage.setItem("userRole", role);
    alert(`Role selected: ${role}`);
}
