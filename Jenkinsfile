pipeline {
    agent {
        label 'docker-companion'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t atamdocker/appinventory:latest -t atamdocker/appinventory:${app_version}'
            }
        }
        stage('Publish Image') {
            steps {
                withDockerRegistry([ credentialsId: "${credential}", url: "" ]) {
                    sh 'docker push atamdocker/appinventory:latest'
                    sh 'docker push atamdocker/appinventory:${app_version}'
                }
            }
        }
    }
}