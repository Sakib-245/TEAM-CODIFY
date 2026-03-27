// Background & Tab Control
// Tab Control Only (Background logic removed to keep color consistent)
const body = document.body;

function switchTab(tab) {
    document.getElementById('review-form').classList.toggle('hidden', tab !== 'review');
    document.getElementById('report-form').classList.toggle('hidden', tab !== 'report');
    document.getElementById('tab-review').classList.toggle('active', tab === 'review');
    document.getElementById('tab-report').classList.toggle('active', tab === 'report');
}

// ... rest of your code ...

// --- REPORT FORM LOGIC ---
const issueSelect = document.getElementById('issue-type');
const otherIssueContainer = document.getElementById('other-issue-container');
const otherIssueInput = document.getElementById('other-issue-input');
const reportText = document.getElementById('report-text');
const submitReportBtn = document.getElementById('submit-report');
const repEventName = document.getElementById('rep-event-name');
issueSelect.addEventListener('change', function() {
    if (this.value === 'other') {
        otherIssueContainer.classList.remove('hidden');
        otherIssueInput.setAttribute('required', 'required');
    } else {
        otherIssueContainer.classList.add('hidden');
        otherIssueInput.removeAttribute('required');
        otherIssueInput.value = ""; 
    }
    validateReport();
});

repEventName.addEventListener('input', validateReport);
function validateReport() {
    const isEventNameOk = repEventName.value.trim().length > 0; // New check
    const isCategoryOk = issueSelect.value !== "";
    const isTextOk = reportText.value.trim().length > 0;
    let isOtherOk = issueSelect.value === 'other' ? otherIssueInput.value.trim().length > 0 : true;
    
    // Include isEventNameOk in the final check
    submitReportBtn.disabled = !(isEventNameOk && isCategoryOk && isTextOk && isOtherOk);
}

reportText.addEventListener('input', () => {
    document.getElementById('report-char-count').textContent = reportText.value.length;
    validateReport();
});
otherIssueInput.addEventListener('input', validateReport);

// --- REVIEW FORM LOGIC ---
let currentRating = 0;
const stars = document.querySelectorAll('.star');
const revText = document.getElementById('review-text');
const revEventName = document.getElementById('rev-event-name');
const submitReviewBtn = document.getElementById('submit-review');

stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.value);
        stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.value) <= currentRating));
        validateReview();
    });
});

function validateReview() {
    const isNameOk = revEventName.value.trim().length > 0;
    const isTextOk = revText.value.trim().length > 0;
    const isRatingOk = currentRating > 0;
    submitReviewBtn.disabled = !(isNameOk && isTextOk && isRatingOk);
}

revText.addEventListener('input', () => {
    document.getElementById('review-char-count').textContent = revText.value.length;
    validateReview();
});
revEventName.addEventListener('input', validateReview);

// --- SHARED IMAGE LOGIC (ACCUMULATIVE, MAX 3, NO DUPLICATES) ---
function setupMultiUpload(inputId, previewId) {
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewId);
    
    // This array acts as the persistent storage for selected files
    let accumulatedFiles = [];

    input.addEventListener('change', function() {
        const incomingFiles = Array.from(this.files);

        incomingFiles.forEach(file => {
            const fileKey = `${file.name}-${file.size}`;
            
            // 1. Check if we already have this file (Distinct check)
            const isDuplicate = accumulatedFiles.some(f => `${f.name}-${f.size}` === fileKey);
            
            // 2. Only add if not duplicate and under the limit of 3
            if (!isDuplicate) {
                if (accumulatedFiles.length < 3) {
                    accumulatedFiles.push(file);
                } else {
                    // Only alert once if the user tries to go over
                    if (incomingFiles.indexOf(file) === 0) alert("Maximum 3 images allowed.");
                }
            }
        });

        // Sync the internal input.files with our accumulated array
        syncInput(input, accumulatedFiles);
        renderPreviews(input, previewContainer, accumulatedFiles);
        
        // Reset the input value so the same file can be picked again if deleted
        this.value = "";
    });
}

function syncInput(input, fileArray) {
    const dt = new DataTransfer();
    fileArray.forEach(f => dt.items.add(f));
    input.files = dt.files;
}

function renderPreviews(input, container, fileArray) {
    container.innerHTML = "";
    
    fileArray.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = 'preview-img';
            div.style.backgroundImage = `url(${e.target.result})`;
            
            const removeBtn = document.createElement('button');
            removeBtn.type = "button";
            removeBtn.className = "remove-img";
            removeBtn.innerHTML = "×";
            
            removeBtn.onclick = (event) => {
                event.stopPropagation();
                // Remove from our persistent array
                fileArray.splice(index, 1);
                // Sync and re-render
                syncInput(input, fileArray);
                renderPreviews(input, container, fileArray);
            };
            
            div.appendChild(removeBtn);
            container.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
}

// Initialize
// setupMultiUpload('review-upload', 'review-previews');
// setupMultiUpload('report-upload', 'report-previews');

// function renderPreviews(input, container) {
//     container.innerHTML = "";
//     Array.from(input.files).forEach((file, index) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const div = document.createElement('div');
//             div.className = 'preview-img';
//             div.style.backgroundImage = `url(${e.target.result})`;
            
//             const removeBtn = document.createElement('button');
//             removeBtn.type = "button";
//             removeBtn.className = "remove-img";
//             removeBtn.innerHTML = "×";
//             removeBtn.onclick = (event) => {
//                 event.stopPropagation();
//                 const dt = new DataTransfer();
//                 const currentFiles = Array.from(input.files);
//                 currentFiles.splice(index, 1);
//                 currentFiles.forEach(f => dt.items.add(f));
//                 input.files = dt.files;
//                 renderPreviews(input, container);
//             };
//             div.appendChild(removeBtn);
//             container.appendChild(div);
//         };
//         reader.readAsDataURL(file);
//     });
// }

// Initialize Once
setupMultiUpload('review-upload', 'review-previews');
setupMultiUpload('report-upload', 'report-previews');

// --- SUBMISSION ---
document.getElementById('review-form').onsubmit = (e) => {
    e.preventDefault();
    showToast();
};

document.getElementById('report-form').onsubmit = (e) => {
    e.preventDefault();
    showToast();
};

function showToast() {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

// Initial Button State
validateReview();
validateReport();

