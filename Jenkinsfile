pipeline {
    agent any

    stages {
        stage('Build Maven') {
            steps {
                // Récupérer le code depuis le dépôt Git
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/oussamaachahbar/hotel-ci-di-']])
                // Construire le projet avec Maven
                bat 'mvn clean install'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    // Construire l'image Docker
                    bat 'docker build -t tornado911/devops-hotel .'
                }
            }
        }

        stage('Push Docker image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-token', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        // Se connecter à Docker Hub
                        bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                        // Taguer l'image Docker
                        bat 'docker tag tornado911/devops-hotel:latest tornado911/devops-hotel:1.0'
                        // Pousser l'image sur Docker Hub
                        bat 'docker push tornado911/devops-hotel:1.0'
                    }
                }
            }
        }

        stage('Deploy to k8s') {
            steps {
                script {
                    // Déployer sur Kubernetes
                    kubernetesDeploy(configs: 'deploymentservice.yaml', kubeconfigId: 'k8sconfigpwd')
                }
            }
        }
    }
}
