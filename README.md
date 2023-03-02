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

### 회원가입 및 로그인

- JWT 토큰 기반 구현

- 타이핑할 때마다 자동으로 중복 체크 가능

- 이메일 유효여부 검사 및 인증을 통해 가입

- 계정 공개 여부 및 관심 질병 선택이 가능

- 간단한 온보딩 페이지를 거치면 가입 완료

<p align="center">
<img src="https://user-images.githubusercontent.com/100753588/219596124-fc69226a-e1e8-4fc8-bac4-2dc9f51d0e8f.gif" width="300">
<img src="https://user-images.githubusercontent.com/100753588/219596225-0f64d5b1-ee1e-4708-9222-ea2267230c04.gif" width="300" height="657">
</p>

### 하단 탭별 페이지 및 기능

- **일기 메인 페이지**
    
    - 팔로우한 유저, 구독한 일기장, 내가 쓴 일기 모아보기
    
    - 내가 쓴 일기나, 팔로우, 구독한 일기장들의 일기들이 최신순으로 정렬된다.
    
    - 무한 스크롤을 통해 피드 게시물을 끊김없이 볼 수 있다.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/100753588/219596727-c536eed0-d6c0-40a0-aed2-5e079fac4e83.gif" width="300" height="657">
    </p>


- **일기장 피드**
    
    - 일기장 목록을 최신순, 인기순으로 정렬하여 확인할 수 있다.
    
    - 개별 일기장에는 해당 일기장에 작성된 일기의 개수와 유저들이 해당 일기장을 구독한 수가 표시된다. 
    
    - 공개된 일기장은 클릭하여 상세페이지를 확인할 수 있다.
    
    - 질병/수술 또는 증상으로 필터링할 수 있다. 
    
    - 필터링 결과 또한 최신순, 인기순으로 정렬하여 확인할 수 있다.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/87812825/219595923-f6fc9393-90f9-4322-8bd3-560a2d1d0244.gif" width="300" height="570">
    </p>


- **오늘의 컨디션 체크**
    
    - 매일 그 날의 컨디션을 10가지 기준으로 기록할 수 있다. 
    
    - 등록한 컨디션은 동기처리되어 내 프로필, 하단탭, 내가 오늘 쓴 일기에 반영된다. 
    
    - 컨디션은 매일 자정 리셋된다. 
    
    - 프로필 페이지 및 일기장 상세 페이지의 달력에서 일자별로 기록된 컨디션을 볼 수 있다.
    
    <p align="center">
    <img src="https://user-images.githubusercontent.com/87812825/219596472-d41a0388-4597-4318-b1f6-65b0c3851582.gif" width="300" height="570">
    </p>
	

- **대나무숲 피드**
    - 24시간이면 사라지는 대나무숲 기능으로, 익명성이 보장된다.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/72545216/219597103-3570ee12-1e20-4bc6-9a8c-bf02b182a8f7.gif" width="300" height="657">
    </p>

- **프로필 페이지**
    
    - 유저의 당일 컨디션과 닉네임, 공개 여부, 팔로잉과 팔로워 수를 확인할 수 있다. 
    
    - 프로필 페이지 또는 팔로우 목록 페이지에서 유저를 팔로우할 수 있다. 
    
    - 이때 비공개 유저에게 팔로우 신청을 하면 해당 유저가 수락했을 때 팔로우된다. 
    
    - 내 팔로워가 더 이상 나를 팔로우하지 않도록 할 수 있다.
    
    - 유저의 한 달간의 컨디션 달력, 유저가 작성한 일기장, 유저가 구독한 일기장을 탭으로 확인할 수 있다.
    
    - 프로필 페이지에서는 달력의 선택한 날짜에 작성된 모든 일기가 하단에 표시된다.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/87812825/219596894-60ac14f4-1693-42bc-bced-e0ea3374d63f.gif" width="300" height="570">
    </p>

- 프로필 수정
    
    - 프로필 수정 페이지에서 닉네임, 관심 질병/증상 정보 또는 계정 공개 여부를 변경할 수 있다.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/87812825/219597136-1bac9366-4f48-4065-ba0c-07e8f6eb345e.gif" width="300" height="657">
    </p>

	
### 일기장

- **일기장 생성 및 수정**
    - 메인 피드, 일기장 피드 등에서 Floating 버튼을 클릭하여 새 일기장을 생성할 수 있다. 
    
    - 일기장마다 한 가지 질병 또는 수술을 선택하고, 여러 개의 증상을 선택할 수 있다.
    
    - 유저가 보유한 질병 또는 수술에 따라 여러 개의 일기장을 생성할 수 있다.
    
    - 일기장 수정 페이지에서 일기장 제목, 설명, 공개 여부를 수정할 수 있다. 
    
    - 해당 일기장의 증상을 추가 또는 삭제가 가능하다.
    
    - 일기장을 삭제할 수 있다.
    
    <p align="center">
    <img src="https://user-images.githubusercontent.com/87812825/219597319-e7ca8c96-65fa-4d69-be39-16e2d0bbeb81.gif" width="300" height="640">
    </p>

- **일기장 상세**
    
    - 해당 일기장의 상세 정보가 표시된다. 
    
    - 일기장을 구독하거나 신고할 수 있다. 
    
    - 일기장을 구독하면 해당 일기장의 일기가 메인 피드에 표시된다. 
    
    - 내 일기장이라면 일기장 수정이 가능하고, 해당 일기장의 특정 일자에 일기를 작성할 수 있다.
  
    - 일기장에 기록된 주간, 월간별 증상 추이 그래프를 확인할 수 있고, 일자별 일기를 확인할 수 있다. 
    
    <p align="center">
    <img src="https://user-images.githubusercontent.com/100753588/219597726-7ff83e06-625c-4413-a773-2cb03e88c0ba.gif" width="320" height="620">
    </p>

- **일기 상세**
    
    - 일기 내용을 바탕으로 감정을 분석하고 그 결과를 통해 감정에 맞는 음악이 재생된다. (음악 자동재생 여부는 프로필에서 설정가능)
    
    - 일기에는 질병, 증상과 증상의 힘든 정도, 일기 내용, 관련 사진들이 게시된다.
    
    - 댓글을 통해 유저간에 소통이 가능하다.
    
    - 일기 및 댓글은 신고가 가능하다
    <p align="center">
    <img src="https://user-images.githubusercontent.com/59593223/219598007-aaae9cb6-b2e4-4391-b75d-749b7ee72884.gif" width="300" height="657">
    </p>


- **일기 작성**
    
    - 일기를 작성할 때 일기장과 날짜를 선택할 수 있다.
    - 증상을 기록할 수 있고, 사진을 등록하여 게시할 수 있다.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/72545216/219597501-196728d6-5a6c-4367-bbe8-57f6ad0eba0c.gif" width="300" height="657">
    </p>



- **일기 수정**

  - 일기가 생성된 이후, 일기 편집 버튼을 통해 일기 내용을 수정 할 수 있다. 
  - 증상 점수 수정 및 사진 편집이 가능하다 
    <p align="center">
    <img src="https://user-images.githubusercontent.com/100753588/219597918-4bb3afcd-c3f9-4843-84b2-bbdb34b1ba58.gif" width="300" height="657">
    </p>

### 검색: 일기, 일기장, 유저 검색

  - 검색을 통해 검색어와 관련된 일기, 일기장, 유저를 찾아볼 수 있다.
  - 최근 검색 기록을 확인하고 삭제할 수 있다.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/100753588/219598233-f2e95633-b0ad-406b-8486-9d2a96e45344.gif" width="300" height="657">
    </p>

### 알림

  - 나와 관련된 반응들을 SSE를 이용한 알림을 통해 알려준다.
  
  - 알림이 오면 상단 내비게이션 바 우측 아이콘의 색깔이 바뀌고, 알림을 확인하면 원복된다. 
  
  - 알림을 선택하여 해당 일기/일기장/대나무 등 게시글로 이동할 수 있다. 
    <p align="center">
    <img src="https://user-images.githubusercontent.com/87812825/219597986-26ae2bd6-cc9d-47dc-be02-241551b6ed36.gif" width="300" height="600">
    </p>   


### 계정 설정: 비밀번호 수정하기, 로그아웃, 회원 탈퇴
    
   - 유저의 프로필 페이지에서 ‘계정 설정하기’를 통해 비밀번호 수정, 로그아웃, 회원 탈퇴를 할 수 있다.
  <p align="center">
    <img src="https://user-images.githubusercontent.com/87812825/219598222-31406941-a8e9-4b1c-829c-7340df8c6771.gif" width="300" height="657">
  </p>   

### 아이디 찾기, 비밀번호 찾기
    
  - 아이디 찾기는 가입시 사용한 이메일을 통해 로그인 페이지에서 가능하다.
  
  - 비밀번호 찾기는 로그인 페이지에서 진행할 경우 이메일과 아이디를 입력하여야 하고, 프로필 페이지에서 진행할 경우 기존 비밀번호를 확인하여야 가능하다.
    <p align="center">
    <img src="https://user-images.githubusercontent.com/87812825/219599210-fc1362aa-5663-4113-8c1f-5fe4e6d619ef.gif" width="300" height="657">
    </p>   


### 404 페이지
  <p align="center">
  <img src="https://user-images.githubusercontent.com/59593223/219598251-be73fbb2-f64e-4ffc-a33c-8037c1315398.png" width="300" height="657">
  </p>   

# 5. 설계문서

### erd
	
![Untitled 1](https://user-images.githubusercontent.com/87812825/219598318-09776bd9-80fe-4bce-8c16-91b050eac80b.png)

## api 명세서 링크

[API 설계서 (최종)](https://www.notion.so/API-f717e7ca7cb4499faa9d4f76e59e0050) 

## 와이어프레임, 스토리보드

[https://www.figma.com/file/KllyQn87oUHHAm2XVmsPtx/와이어프레임?node-id=0%3A1&t=2fuLepxakIDnBkGB-0](https://www.figma.com/file/KllyQn87oUHHAm2XVmsPtx/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0%3A1&t=2fuLepxakIDnBkGB-0)

![Untitled 2](https://user-images.githubusercontent.com/72545216/219598210-5c8befad-ec8c-47d9-8c7e-f6c49d5ecb20.png)
![Untitled 3](https://user-images.githubusercontent.com/72545216/219598220-d981e0dd-fab4-483d-8b5a-6c897c1554b2.png)
