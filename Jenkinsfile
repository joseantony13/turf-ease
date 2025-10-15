pipeline {
    agent any
    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/joseantony13/turf-ease.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t turf-frontend ./frontend'
                sh 'docker build -t turf-backend ./backend'
            }
        }
        stage('Push to DockerHub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-token', variable: 'TOKEN')]) {
                    sh 'echo $TOKEN | docker login -u jose22an --password-stdin'
                    sh 'docker tag turf-frontend jose22an/turf-frontend:latest'
                    sh 'docker tag turf-backend jose22an/turf-backend:latest'
                    sh 'docker push jose22an/turf-frontend:latest'
                    sh 'docker push jose22an/turf-backend:latest'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
