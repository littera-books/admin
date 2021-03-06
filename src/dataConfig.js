const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://api.littera.co.kr'
  : 'http://localhost:8000';

export default {
  baseUrl,
  fontUrl:
    'https://fonts.googleapis.com/css?family=Nanum+Myeongjo:400,700&amp;subset=korean',
  siteTitle: 'Littera Admin',
  dashboardText: '상단 헤더의 버튼을 눌러 작업을 시작하세요.',
  surveyTitle: '설문조사 관리',
  productTitle: '상품 관리',
  userTitle: '유저 관리',
  defaultDetailText: '좌측 리스트를 눌러 작업을 시작하세요.',
  tokenExpiredText: 'Your access token is expired. Please login again.',
  popupMessage: {
    destroyQuestion: {
      header: '질문 삭제',
      message:
        '질문을 삭제하면 이 질문에 연결된 유저들의 응답도 모두 삭제됩니다. 계속하시겠습니까?',
    },
    destroyProduct: {
      header: '상품 삭제',
      message:
        '상품을 삭제하면 이 질문에 연결된 유저들의 결제 정보도 모두 삭제됩니다. 계속하시겠습니까?',
    },
    destroyPromotion: {
      header: '프로모션 삭제',
      message: '이 상품에 대한 프로모션 코드를 삭제하시겠습니까?',
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
