// Heroku 환경 변수 확인 스크립트 (로컬에서 실행)
console.log('=== Heroku 환경 변수 확인 ===\n');
console.log('MONGO_URI 설정 여부:', !!process.env.MONGO_URI);
if (process.env.MONGO_URI) {
  console.log('MONGO_URI 값:', process.env.MONGO_URI.replace(/\/\/.*@/, '//***:***@'));
} else {
  console.log('❌ MONGO_URI가 설정되지 않았습니다!');
  console.log('\nHeroku에서 환경 변수를 설정해야 합니다:');
  console.log('heroku config:set MONGO_URI=mongodb+srv://hplus365:as8623536*@cluster0.bazb3fm.mongodb.net/todos');
}

