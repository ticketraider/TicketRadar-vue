<template>
  <div>
    <div class="header">
      <h2>유저 정보</h2>
    </div>

<!--    <div v-if="!isPasswordVerified" class="loading" style="text-align: center;">-->
<!--      <div style="width: 400px; margin: 0 auto;">-->
<!--        <input type="password" v-model="currentPassword" placeholder="현재 비밀번호를 입력해주세요" class="form-control">-->
<!--        <button type="button" class="btn btn-primary" style="margin-top: 10px; background-color: #392365;" @click="verifyCurrentPassword">비밀번호 확인</button>-->
<!--      </div>-->
<!--    </div>-->

    <form style="margin-top: 20px;">
      <div class="card-content">
        <label class="form-label">유저 정보 변경</label>
        <div class="mb-3">
          <p>현재 닉네임: {{ currentUserNickname }}</p>
          <p>현재 이메일: {{ currentUserEmail }}</p>
        </div>
<!--        <div class="mb-3">-->
<!--          <label class="form-label">비밀번호</label>-->
<!--          <input type="password" v-model="password" placeholder="비밀번호를 입력해주세요" class="form-control">-->
<!--        </div>-->
        <div class="mb-3">
          <label class="form-label">닉네임</label>
          <input type="text" v-model="nickname" placeholder="닉네임을 입력해주세요" class="form-control">
        </div>
        <div style="text-align: right;">
          <button type="button" class="btn btn-primary" style="background-color: #392365;" @click="updateUserInfo">변경</button>
        </div>
        <div style="text-align: end; margin-top: 20px;">
          <button type="button" class="btn btn-danger" @click="deleteAccount">계정 탈퇴</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

// 상태 관리
// const password = ref("");
const nickname = ref("");
// const currentPassword = ref("");
const currentUserNickname = ref("");
const currentUserEmail = ref("");// 유저 현재 닉네임
// const isPasswordVerified = ref(false); // 비밀번호가 확인되었는지 나타내는 상태
const apiUrl = 'https://api.ticketradar.net';
const token = localStorage.getItem('token');

onMounted(() => {
  fetchUserInfo();
});

// 현재 비밀번호 확인 후 유저 정보 업데이트 폼 표시
// async function verifyCurrentPassword() {
//   try {
//     console.log(token)
//     console.log(currentPassword.value)
//     const response = await axios.post(`${apiUrl}/members/verify-password`, {}, {
//       params: {
//         currentPassword: currentPassword.value
//       },
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//     });
//     await fetchUserInfo();
//     if (response.data.success) {
//       isPasswordVerified.value = true;
//       // 비밀번호 확인 성공 시, 업데이트 폼 표시
//     } else {
//       alert('비밀번호가 일치하지 않습니다.');
//     }
//   } catch (error) {
//     console.error('비밀번호 확인 중 오류가 발생했습니다.', error);
//     alert('비밀번호가 일치하지 않습니다.');
//   }
// }

// 유저 정보 업데이트
async function updateUserInfo() {
  try {
    await axios.put(`${apiUrl}/members/update`, {},
      {
        params: {
          nickname: nickname.value
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
    });
    await fetchUserInfo();
    alert('유저 정보가 성공적으로 업데이트 되었습니다.');
    window.location.reload()
    // 업데이트 성공 후 필요한 처리 추가 (예: 페이지 새로고침, 리다이렉트 등)
  } catch (error) {
    console.error('유저 정보 업데이트 중 오류가 발생했습니다.', error);
    alert('유저 정보 업데이트 중 문제가 발생했습니다.');
  }
}
async function fetchUserInfo() {

  const decodedToken = jwtDecode(token);
  const memberId = decodedToken.sub;

  try {
    const response = await axios.get(`${apiUrl}/members/${memberId}`);
    currentUserNickname.value = response.data.nickname; // 조회된 유저 닉네임 저장
    currentUserEmail.value = response.data.email; // 조회된 유저 이메일 저장
  } catch (error) {
    console.error('유저 정보 조회 중 오류가 발생했습니다.', error);
  }
}

// 계정 삭제 로직
async function deleteAccount() {
  // 사용자 확인 절차 추가 권장 (예: "정말로 계정을 삭제하시겠습니까?" 대화상자 표시)
  const confirmation = confirm('정말로 계정을 삭제하시겠습니까?');
  if (!confirmation) {
    return;
  }

  try {
    await axios.delete(`${apiUrl}/members/unregister`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, // DELETE 요청 시 본문을 보내려면 'data' 속성 사용
    });

    localStorage.removeItem('token');
    alert('계정이 성공적으로 삭제되었습니다.');
    window.location.reload()
    // 계정 삭제 성공 후 필요한 처리 추가 (예: 로그아웃, 홈 페이지로 리다이렉트)
  } catch (error) {
    console.error('계정 삭제 중 오류가 발생했습니다.', error);
    alert('계정 삭제 중 문제가 발생했습니다.');
  }
}
</script>


<style scoped>

</style>