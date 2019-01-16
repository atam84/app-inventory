pipeline {
    agent {
        label '${env.AGENT_LABEL_BUILD}'
    }
    stages {
        stage('Configuration') {
            steps {
                sh 'echo "APP_VERSION = ${env.APP_VERSION}"'
                sh 'echo "AGENT_LABEL_BUILD = ${env.AGENT_LABEL_BUILD}"'
                sh 'echo "PUSH_IN_REGISTRY = ${env.PUSH_IN_REGISTRY}"'
                sh 'echo "PUSH_AS_LATEST = ${env.PUSH_AS_LATEST}"'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t atamdocker/appinventory:latest -t atamdocker/appinventory:${env.APP_VERSION} .'
            }
        }
        stage('Publish Image') {
            steps {
                withDockerRegistry([ credentialsId: "${credential}", url: "" ]) {
                    sh 'docker push atamdocker/appinventory:latest'
                    sh 'docker push atamdocker/appinventory:${env.APP_VERSION}'
                }
            }
        }
    }
}