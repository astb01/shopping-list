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
    CONTAINER_TESTS_DIR = './test/container/'
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
        
        sh 'npm prune'
        sh 'npm install'
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build --tag ${env.REGISTRY}:${env.VERSION_NUMBER} .'
        sh 'docker image ls'
      }
    }

    stage('Test Docker Image') {
      steps {
        sh 'container-structure-test test --image  ${env.REGISTRY}:${env.VERSION_NUMBER} ${env.CONTAINER_TESTS_DIR}/confg.json'
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