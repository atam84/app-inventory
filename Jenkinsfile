pipeline {
    /*
    agent {
        node {
            label 'docker-node'
        }
    }
    */
    agent any
    parameters {
        string(name: 'APP_VERSION', defaultValue: '0.4b', description: 'Tag this build with version.')
        string(name: 'DOCKER_REGISTRY', defaultValue: '', description: 'Your docker registry, if this value is blanc the public registry should be used.')
        string(name: 'TAGS', defaultValue: '', description: 'Add tags separete by space, the image can be tagged many time.')
        booleanParam(name: 'PUSH_IN_REGISTRY', defaultValue: true, description: 'Push built image in the registry.')
        booleanParam(name: 'PUSH_AS_LATEST', defaultValue: false, description: 'Tag this version as latest in docker registry.')
        booleanParam(name: 'CLEAN_UP', defaultValue: false, description: 'Remove build images from the build node.')
        choice(name: 'BUILD_NODE', choices: ['docker-node', 'master', 'Three'], description: 'Select the build node, where the build will be performed.')
        choice(name: 'NODEJS_VERSION', choices: ['11', '10', '9', '8', '4'], description: 'Select major version of NodeJS to use.')
        choice(name: 'METEOR_VERSION', choices: ['1.8', '1.7', '1.6', '1.5', '1.4'], description: 'Select version of MeteorJS to use.')
        booleanParam(name: 'FROM_SCRATCH_BUILD', defaultValue: true, description: 'Build from scratch rader than use existing base image.')
    }
    stages {
        stage('Configuration') {
            steps {
                /*
                def tags = params.TAGS
                echo "APP_VERSION = ${params.APP_VERSION}"
                echo "DOCKER_REGISTRY = ${params.DOCKER_REGISTRY}"
                echo "TAGS = ${params.TAGS}"
                tags.split().each { tag ->
                    echo " image will be tagged : ${tag}"
                }
                echo "CLEAN_UP = ${params.CLEAN_UP}"
                echo "BUILD_NODE = ${params.BUILD_NODE}"
                echo "PUSH_IN_REGISTRY = ${params.PUSH_IN_REGISTRY}"
                echo "PUSH_AS_LATEST = ${params.PUSH_AS_LATEST}"
                echo "NODEJS_VERSION = ${params.NODEJS_VERSION}"
                echo "METEOR_VERSION = ${params.METEOR_VERSION}"
                echo "FROM_SCRATCH_BUILD = ${params.FROM_SCRATCH_BUILD}"
                */
            }
        }
        stage('Build Docker Image') {
            steps {
                //echo "docker build -t atamdocker/appinventory:latest -t atamdocker/appinventory:${params.APP_VERSION} ."
            }
        }
        stage('Publish Image') {
            steps {
                /*
                withDockerRegistry([ credentialsId: "${credential}", url: "" ]) {
                    echo "docker push atamdocker/appinventory:latest"
                    echo "docker push atamdocker/appinventory:${params.APP_VERSION}"
                }
                */
                /*
                echo "docker push atamdocker/appinventory:latest"
                echo "docker push atamdocker/appinventory:${params.APP_VERSION}"
                */
            }
        }
    }
}





/*

pipeline {
    agent any
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
        text(name: 'BIOGRAPHY', defaultValue: '', description: 'Enter some information about the person')
        booleanParam(name: 'TOGGLE', defaultValue: true, description: 'Toggle this value')
        choice(name: 'CHOICE', choices: ['One', 'Two', 'Three'], description: 'Pick something')
        password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'Enter a password')
        file(name: "FILE", description: "Choose a file to upload")
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello ${params.PERSON}"
                echo "Biography: ${params.BIOGRAPHY}"
                echo "Toggle: ${params.TOGGLE}"
                echo "Choice: ${params.CHOICE}"
                echo "Password: ${params.PASSWORD}"
            }
        }
    }
}

*/
