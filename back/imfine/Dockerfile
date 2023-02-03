FROM gradle:jdk11 as build

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Build the project
RUN gradle build --no-daemon

# Use a base image with Java only
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the compiled application from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Set environment variables
ENV JAVA_OPTS=""

# Run the application
CMD ["java", "-jar", "app.jar"]


#FROM adoptopenjdk/openjdk11
#
#ENV APP_HOME=/usr/app/
#
#WORKDIR $APP_HOME
#
#COPY build/libs/*SNAPSHOT.jar app.jar
#
#EXPOSE 8080
#
#CMD ["java", "-jar", "app.jar"]