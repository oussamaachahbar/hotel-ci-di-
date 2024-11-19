pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Récupérer le code depuis le dépôt Git
                checkout scmGit(
                    branches: [[name: '*/main']],
                    extensions: [],
                    userRemoteConfigs: [[url: 'https://github.com/oussamaachahbar/hotel-ci-di-']]
                )
            }
        }

        stage('Build with Maven') {
            steps {
                echo 'Building the project with Maven...'
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/oussamaachahbar/hotel-ci-di-']])
                bat 'mvn clean install'
                bat 'dir target'  // Liste des fichiers dans le répertoire target pour vérifier que le JAR existe
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    // Construire l'image Docker avec un tag spécifique
                    bat 'docker build -t tornado911/devops-hotel:latest .'
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-token', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        // Se connecter à Docker Hub
                        bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'

                        // Pousser l'image Docker vers Docker Hub avec le nouveau nom de dépôt
                        bat 'docker push tornado911/devops-hotel:latest'
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

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for more details.'
        }
    }
}
