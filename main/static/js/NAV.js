    // 로그인 팝업 시작
    document.querySelector('.login').addEventListener('click', function() {
        document.querySelector('.login-popup').style.display = 'block';
      });
  
      function closeLoginPopup() {
        document.querySelector('.login-popup').style.display = 'none';
      }
      //로그인 팝업 종료
  
      //회원가입 팝업 시작
      document.querySelector('.signup-link').addEventListener('click', function() {
        document.querySelector('.signup-popup').style.display = 'block';
        document.querySelector('.login-popup').style.display = 'none'; // Hide login popup
      });
  
      function closeSignupPopup() {
        document.querySelector('.signup-popup').style.display = 'none';
        document.querySelector('.login-popup').style.display = 'block'; // Show login popup
      }
  
      // 회원가입 폼 양식
      function validateForm() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var nickname = document.getElementById("nickname").value;
  
        var usernamePattern = /[a-zA-Z0-9]{4,12}/;
        var passwordPattern = /.{6,}/;
        var nicknamePattern = /.{2,8}/;
  
        if (!usernamePattern.test(username)) {
          alert("아이디는 영어와 숫자만 입력 가능하며, 4글자 이상 12글자 이하로 입력해야 합니다.");
          return false;
        }
  
        if (!passwordPattern.test(password)) {
          alert("비밀번호는 6자 이상 입력해야 합니다.");
          return false;
        }
  
        if (!nicknamePattern.test(nickname)) {
          alert("닉네임은 2글자 이상 8글자 이하로 입력해야 합니다.");
          return false;
        }
  
        alert("회원가입이 완료되었습니다!");
        return true;
      }
      // 회원가입 팝업 종료
  