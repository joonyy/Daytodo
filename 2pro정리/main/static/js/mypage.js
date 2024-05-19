const mypageLink = document.getElementById('mypageLink');
const mypagePopup = document.getElementById('mypagePopup');
const changePasswordLink = document.getElementById('changePasswordLink');
const changePasswordPopup = document.getElementById('changePasswordPopup');
const withdrawLink = document.getElementById('withdrawLink');
const withdrawPopup = document.getElementById('withdrawPopup');

let isMypageOpen = false; // mypage 팝업 상태를 나타내는 변수

mypageLink.addEventListener('click', function(event) {
    event.preventDefault(); // 기본 동작 방지

    if (!isMypageOpen) { // mypage 팝업이 열려있지 않은 경우
        mypagePopup.style.display = 'block'; // mypage 팝업을 보이도록 변경
        isMypageOpen = true; // mypage 팝업 상태 업데이트
    } else { // mypage 팝업이 열려있는 경우
        mypagePopup.style.display = 'none'; // mypage 팝업을 숨기도록 변경
        isMypageOpen = false; // mypage 팝업 상태 업데이트
    }
});

changePasswordLink.addEventListener('click', function(event) {
    event.preventDefault(); // 기본 동작 방지
    changePasswordPopup.style.display = 'block'; // 비밀번호 변경 팝업을 보이도록 변경
});

withdrawLink.addEventListener('click', function(event) {
    event.preventDefault(); // 기본 동작 방지
    withdrawPopup.style.display = 'block'; // 탈퇴 팝업을 보이도록 변경
});

function closeMypagePopup() {
    mypagePopup.style.display = 'none';
    isMypageOpen = false;
}

function closeChangePasswordPopup() {
    changePasswordPopup.style.display = 'none';
}

function closeWithdrawPopup() {
    withdrawPopup.style.display = 'none';
}

function showConfirmation() {
    if (confirm("회원정보가 삭제됩니다. 동의하시나요?")) {
        window.location.href = "#";
    }
}