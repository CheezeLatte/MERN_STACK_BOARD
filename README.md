# API STARTER

###### by CheezeLatte

##### node v16.4.0   npm v7.19.0


-------
## .ENV 설정

* PORT=포트(설정 없을경우 기본으로 8080)

* MONGO_URL=mongodb://localhost/Data

* JWT_ACCESS_TOKEN_EXPIRES_IN=5m (토큰 리프래쉬 주기)

* ADMIN_EMAIL={관리자 이메일}

* ADMIN_PASSWORD={관리자 비밀번호}

* ADMIN_NAME={관리자 이름}

----

## JWT설정

* https://travistidwell.com/jsencrypt/demo/ 접속후 512bit로 키 2개 생성
* Public key는 access-token.public.key, refresh-token.public.key 파일 생성 후 붙여넣기
* Private key는 access-token.private.key, refresh-token.private.key 파일 생성 후 붙여넣기
* 위의 4개 파일을 루트 디렉토리에 붙여넣기

----

## DEV 환경 구동

* 버전에 맞는 node, npm 설치

* 디렉토리로 이동

* 터미널에서 'npm i' 실행

* 'npm run dev' 로 nodemon 기반 서버 실행

----

## Production 환경 구동

* 버전에 맞는 node, npm 설치

* 디렉토리로 이동

* 터미널에서 'npm i' 실행

* 'npm run start' 로 pm2 기반 서버 실행