FROM gradle:jdk11 as build

WORKDIR /app

COPY . .

RUN gradle build --no-daemon

FROM openjdk:11-jre-slim

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

ENV JAVA_OPTS=""

CMD ["java", "-jar", "app.jar"]