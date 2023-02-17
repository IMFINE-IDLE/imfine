# 리드미

# 1. IMFINE 아임파인 소개

---

## 1-1 IMFINE 의미

서비스를 사용하면서 이제 괜찮아졌다는 말을 할 수 있기를 바라는 회복의 뜻을 담아 아임파인이라는 서비스를 기획하였습니다.

```
서비스 기능
1. 질병을 보유한 사람, 수술을 마친 사람들이 이용한다.
2. 매일 컨디션을 기록하고, 증상 추이를 확인할 수 있다.
3. 일기를 쓰고, 서로 정보와 감정을 공유할 수 있다.
```

## 1-2 프로젝트 상세

프로젝트 진행 기간 : 2023년 1월 3일 ~ 2월 17일 (총 7주)

### 팀원소개

![member.PNG](https://user-images.githubusercontent.com/72545216/219534331-d6a83184-8c4b-4194-b378-3192e75fdd7c.png)

# 2. 개발 환경

---

## 2-1. 환경 설정

---

### Front-End

```
- React 18.2.0
- Node 18.2.1
- React Router Dom 6.7.0
- Redux 8.0.5
- Styled-components 5.3.6
```

### Back-End

```
- java 11  
- Spring boot 2.5.6
- Spring Security
- Spring boot Mail 
- Lombook
- Spring Data JPA
- Mariadb
- redis
```

### Server

```
- AWS EC2
- AWS S3
- AWS comprehend
- NGINX 1.15-alpine
- letsencrypt certbot 0.40.0
- docker 20.10.12
```

## 2-2 사용 기술스택

---

![member](https://user-images.githubusercontent.com/72545216/219534415-16f7999f-9f91-4638-b511-cd9142c32060.png)

## 2-3 서비스 아키텍처

---

![architecture.PNG](https://user-images.githubusercontent.com/72545216/219534222-4d8359ca-9a79-4379-b5c7-3ae53054bd8f.png)

# 3. 서비스 실행 방법

---

1. git clone

---

```powershell
git clone https://lab.ssafy.com/s08-webmobile2-sub2/S08P12A809.git
```

1. nginx 설치 및 설정

---

```powershell
sudo apt-get install nginx
sudo nginx -v #설치 확인
sudo systemctl stop nginx
cd /etc/nginx/sites-available # nginx 설정파일을 작성할 위치로 이동
```

2-1 nginx 서버 설정파일 작성

---

```powershell

# deploy-test.conf
server {
        # 프론트 연결(포트 번호는 본인의 프론트 포트번호를 입력)
        location /{
                proxy_pass http://localhost:3000;
        }

        # 백엔드 연결(포트 번호는 본인의 백엔드 포트번호를 입력)
        location /api {
                proxy_pass http://localhost:8080/api;
        }
        location /images {
                alias /home/ubuntu/resource;
        }

        location /api/sse {
								proxy_pass http://localhost:8080/api/sse;
                proxy_http_version 1.1; 
                proxy_set_header Connection 'keep-alive';
                chunked_transfer_encoding off;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_read_timeout 35s;
                proxy_buffering off;

        }

    listen 443 ssl; # managed by Certbot
    # 도메인 이름을 써줘야함 i8a809.p.ssafy.io
    ssl_certificate /etc/letsencrypt/live/i8a809.p.ssafy.io/fullchain.pem; # managed by Certbot
    # 도메인 이름을 써줘야함
    ssl_certificate_key /etc/letsencrypt/live/i8a809.p.ssafy.io/privkey.pem; # managed by Certbot
    # include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    # 도메인 이름을 입력
    if ($host = [사용할 도메인]) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

        listen 80;
        server_name [사용할 도메인];
    return 404; # managed by Certbot
}
```

2-2 파일연동

---

```powershell
# 설정파일이 작성된 폴더에서 실행할 명령어
sudo ln -s /etc/nginx/sites-available/[파일명].conf /etc/nginx/sites-enalable/[파일명].conf
sudo systemctl restart nginx
```

1. 도커 설치 및 도커컴포즈 설치
    
    ---
    
2. Dockerfile 및 docker-compose.yml 작성
    
    ---
    

[계정의 clone받은 위치 디렉토리]/S08P12A809/back/imfine/Dockerfile

Dockerfile

```powershell
FROM openjdk:11-jdk-slim

ARG JAR_FILE=build/libs/*SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

CMD ["java", "-jar", "-Duser.timezone=Asia/Seoul", "app.jar"]
```

어플리케이션, 도커 이미지 빌드

```powershell
cd [계정의 clone받은 위치 디렉토리]/S08P12A809/back/imfine #빌드할 위치로 이동
./gradlew clean build # 빌드
docker build -t imfine-back # 이미지 생성
```

프론트 엔드 도커파일

```powershell
# Use a base image with Node.js and npm installed
FROM node:18.12.1 as build

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install project dependencies
RUN npm install

# Build the project
RUN npm run build

# Use a base image with Nginx
FROM nginx

# Copy the build artifacts from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Set the Nginx default configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

리액트 프로젝트, 도커 이미지 빌드

```powershell
cd [계정의 clone받은 위치 디렉토리]/dev-front/S08P12A809/front
docker build -t imfine-front .
```

docker-compose.yml

```powershell
version: "3.2"
services:
  front:
    container_name: imfine-front # 프론트엔드 서버 컨테이너 이름
    image: imfine-front #프론트엔드 서버 이미지 이름
    volumes:
      - /etc/localtime:/etc/localtime
    ports:
      - [프론트앤드 서버 포트번호]:[도커 내의 포트번호]

  back:
    container_name: imfine-back # 백엔드 서버 컨테이너 이름
    image: imfine-back # 백엔드 서버 이미지 이름
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mariadb://[MariaDB 컨테이너 이름]:[도커에서 연동할 포트번호]/imfine
      - SPRING_DATASOURCE_USERNAME=[MariaDB 계정이름]
      - SPRING_DATASOURCE_PASSWORD=[계정의 비밀번호]
    ports:
      - [백엔드 서버 포트번호]:[도커 내의 포트번호]
    volumes:
      - [연동할 실제 위치]:/home/resource
      - /etc/localtime:/etc/localtime
    depends_on:
      - [MariaDB 컨테이너 이름]
      - [redis 컨테이너 이름]

  mariadb:
    container_name: [MariaDB 컨테이너 이름]
    image: mariadb
    volumes:
      - [연동할 실제 위치]:/var/lib/mysql
      - /etc/localtime:/etc/localtime
    environment:
      - MYSQL_DATABASE=[DB이름]
      - MYSQL_ROOT_PASSWORD=[계정의 비밀번호]
    ports:
      - [port]:3306

  redis:
    container_name: [redis 컨테이너 이름]
    image: redis
    volumes:
      - [연동할 실제 위치]:/data
      - /etc/localtime:/etc/localtime
    ports:
      - [port]:6379
```

도커 컴포즈 설정파일로 서버 올리기

```powershell
cd [도커 컴포즈 파일이 위치한 경로]
docker-compose up # 해당 터미널 포그라운드에서 실행 이거 아니면
docker-compose up -d # 백그라운드로 실행
```

# 4. 주요기능

- 회원가입  / 로그인
    
    타이핑할 때마다 자동으로 중복체크가 가능하다
    
    이메일 인증을 통해 가입할 수 있다
    
- 메인페이지: 팔로우한, 구독한 일기 모아보기
내가 쓴 일기나, 팔로우, 구독한 일기장들의 일기들이 최신순으로 정렬된다.
일기 내용을 감정 분석하고 그 결과를 통해 감정에 맞는 bgm이 재생된다.
    
    일기에는 질병, 증상과 증상의 힘든 정도, 일기내용, 관련 사진들이 게시된다.
    
    댓글을 통해 유저간에 소통이 가능하다.
    
    ![메인결과물.gif](https://user-images.githubusercontent.com/72545216/219533727-806ba3e7-a422-408b-abb0-3ab1ca251fbc.gif)
    
- 2번째 탭: 관심 질병, 증상별로 일기장 모아보기 및 필터링
필터를 통해 원하는 일기장을 찾을 수 있다.
최신순, 인기순 2가지 정렬기준으로 정렬된다.
일기장을 선택하면 상세 내용과 주간, 월간별 증상 추이를 확인할 수 있다.
달력을 통해 일기장 작성자의 컨디션을 확인할 수 있고 해당 날짜의 일기를 선택해 볼 수 있다.
    
    ![두번째탭 결과.gif](https://user-images.githubusercontent.com/72545216/219533797-b4e79887-8d6d-42ac-a9b4-efc21ead8ff7.gif)
    

- 오늘의 컨디션 체크
매일 그 날의 컨디션을 10가지 기준으로 기록할 수 있고 
마이 프로필에서 매일 기록된 컨디션을 볼 수 있다.
    
    ![컨디션결과.gif](https://user-images.githubusercontent.com/72545216/219534067-acd99604-5647-464a-8820-18a70171277c.gif)
    
- 3번째 탭: 대나무숲
24시간이면 사라지는 대나무숲 기능
익명성이 보장되고 하루가 되면 사라지는 대나무 숲에서 자유롭게 그 날, 평소의 힘든 점을 마음편히 풀어낼 수 있다.
대나무 갯수를 통해 글이 지워질 시간을 확인할 수 있다.
    
    ![대나무숲 결과.gif](![%EB%8C%80%EB%82%98%EB%AC%B4%EC%88%B2_%EA%B2%B0%EA%B3%BC](https://user-images.githubusercontent.com/72545216/219533595-faac2417-d434-4bba-b6e2-52e5a216688e.gif)
    
- 마이 페이지: 나의 컨디션 체크, 나의 일기장,  구독한 일기장 모아보기
달력을 통해 컨디션을 확인할 수 있고 그 날 쓴 나의 일기들, 나의 활동 (내가 쓴 일기장, 구독중인 일기장)을 확인할 수 있다.
공개 비공개 여부를 설정할 수 있다.
    
    ![프로필결과.gif](https://user-images.githubusercontent.com/72545216/219533855-be3fc5e2-b344-44ad-a4cf-808b6fcacd85.gif)
    
- 검색 : 일기, 일기장, 유저 검색
- 알림
나와 관련된 반응들을 SSE를 이용한 알림을 통해 알려준다.
- 팔로우
- 일기장 생성
일기장마다 한 가지 질병을 선택하고, 최대 5개까지의 증상을 선택할 수 있다.
    
    한 사람당 다양한 일기장을 
    
- 일기 작성
    
    일기를 작성할 때 일기장과 날짜를 선택할 수 있다.
    증상을 기록할 수 있고, 사진을 등록하여 게시할 수 있다.
    일기가 등록됨과 동시에 일기 내용으로 감정분석을 하여 추천 BGM이 랜덤으로 재생된다.
    
- 아이디 찾기, 비밀번호 찾기, 닉네임 변경
    
    

# 5. 설계문서

### erd

![ERD](https://user-images.githubusercontent.com/72545216/219534466-0ddf6f14-6541-457c-85bf-94b2ef010c72.png)

## api 명세서 링크

[API 설계서 (최종)](https://www.notion.so/API-f717e7ca7cb4499faa9d4f76e59e0050) 

