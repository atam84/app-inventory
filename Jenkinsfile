pipeline {
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
        text(name: 'BIOGRAPHY', defaultValue: '', description: 'Enter some information about the person')
        booleanParam(name: 'TOGGLE', defaultValue: true, description: 'Toggle this value')
        choice(name: 'CHOICE', choices: ['One', 'Two', 'Three'], description: 'Pick something')
        password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'Enter a password')
        file(name: "FILE", description: "Choose a file to upload")
    }
    agent {
        label '"${params.AGENT_LABEL_BUILD}"'
    }
    stages {
        stage('Configuration') {
            steps {
                sh 'echo "APP_VERSION = ${params.APP_VERSION}"'
                sh 'echo "AGENT_LABEL_BUILD = ${params.AGENT_LABEL_BUILD}"'
                sh 'echo "PUSH_IN_REGISTRY = ${params.PUSH_IN_REGISTRY}"'
                sh 'echo "PUSH_AS_LATEST = ${params.PUSH_AS_LATEST}"'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t atamdocker/appinventory:latest -t atamdocker/appinventory:${params.APP_VERSION} ."
            }
        }
        stage('Publish Image') {
            steps {
                withDockerRegistry([ credentialsId: "${credential}", url: "" ]) {
                    sh 'docker push atamdocker/appinventory:latest'
                    sh "docker push atamdocker/appinventory:${params.APP_VERSION}"
                }
            }
        }
    }
}