FROM openjdk:17
EXPOSE 4040
COPY target/devops-hotel.jar /devops-hotel.jar
ENTRYPOINT ["java", "-jar", "/devops-hotel.jar"]
