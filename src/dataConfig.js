export default {
  baseUrl: 'http://localhost:8000',
  fontUrl:
    'https://fonts.googleapis.com/css?family=Nanum+Myeongjo:400,700&amp;subset=korean',
  siteTitle: 'Littera Admin',
  dashboardText: '상단 헤더의 버튼을 눌러 작업을 시작하세요.',
  surveyTitle: '설문조사 관리',
  questionDetailText: '좌측 설문조사 리스트를 눌러 작업을 시작하세요.',
  popupMessage: {
    destroyQuestion: {
      header: '질문 삭제',
      message:
        '질문을 삭제하면 이 질문에 연결된 유저들의 응답도 모두 삭제됩니다. 계속하시겠습니까?',
    },
    signIn: {
      header: 'Sign In',
      message: 'Welcome Aboard!',
    },
    signOut: {
      header: 'Sign Out',
      message: 'Fare Well.',
    },
    destroyConfirm: {
      confirm: 'delete',
      cancel: 'cancel',
    },
  },
};
