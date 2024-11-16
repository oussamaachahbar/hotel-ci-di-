FROM openjdk:8
EXPOSE 4040
ADD target/devops-hotel.jar devops-hotel.jar
ENTRYPOINT ["java","-jar","/devops-hotel.jar"]