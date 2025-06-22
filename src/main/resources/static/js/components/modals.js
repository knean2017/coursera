// modals.js

export function openModal(id) {
    closeAllModals();

    if (!id) return;

    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "block";
    }
}

export function closeAllModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
        modal.style.display = "none";
    });
}

// Optional: Attach event listener to close modal when clicking outside
window.onclick = function (event) {
    document.querySelectorAll(".modal").forEach((modal) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
};
