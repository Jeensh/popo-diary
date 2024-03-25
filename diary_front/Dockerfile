# 이미지의 베이스로 사용할 node 이미지를 가져옵니다.
FROM node:20.11-alpine3.18 as build

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# package.json 및 package-lock.json을 복사하여 디펜던시 설치를 위해 이미지 내부로 복사합니다.
COPY package*.json ./

# npm 패키지를 설치합니다.
RUN npm install

# 소스 코드를 이미지 내부로 복사합니다.
COPY . .

# 포트를 노출합니다.
EXPOSE 3000

# 빌드를 수행합니다.
CMD ["npm", "start"]