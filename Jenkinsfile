pipeline {
  agent any

  tools {
    nodejs "node"
  }

  environment {
    CI = 'true'
    VERSION_NUMBER = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
    REGISTRY = 'astb01/shoppinglist'
    REGISTRY_CREDENTIALS = 'docker-hub'
    CONTAINER_TESTS_DIR = "${env.WORKSPACE}/src/test/container"
  }

  stages {
    stage('Environment') {
      steps {
        sh 'docker -v'
        sh 'container-structure-test version'
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build and Test') {
      steps {
        print "Branch: ${env.GIT_BRANCH}"

        sh 'node -v'
        sh 'npm install && npm cache verify'
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build --tag ${env.REGISTRY}:${env.VERSION_NUMBER} ."
        sh "docker image ls"
      }
    }

    stage('Test Docker Image') {
      steps {
        sh "pwd"
        sh "container-structure-test test --image  ${env.REGISTRY}:${env.VERSION_NUMBER} --config ${env.CONTAINER_TESTS_DIR}/confg.json"
      }
    }

    stage('Clean Up') {
      steps {
        sh 'docker ps -aq --no-trunc -f status=exited | xargs docker rm'
        sh 'docker images -q --filter dangling=true | xargs docker rmi'
      }
    }

    /*stage('Push Docker Image') {
      steps {
        sh 'docker tag ${env.REGISTRY}:${env.VERSION_NUMBER} ${env.REGISTRY}:latest'
        sh 'docker push ${env.REGISTRY}:${env.VERSION_NUMBER} ${env.REGISTRY}:latest'
      }
    }*/
  }
}