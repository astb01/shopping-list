pipeline {
  agent any

  tools {
    nodejs "node"
  }

  environment {
    CI = 'true'
    VERSION_NUMBER = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
    REGISTRY = 'http://localhost:5000'
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
        env.NODE_ENV = "test"

        print "Branch: ${env.GIT_BRANCH}"
        print "Environment set to: ${env.NODE_ENV}"

        sh 'node -v'
        
        sh 'npm prune'
        sh 'npm install'
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      if ("${env.GIT_BRANCH}" == "origin/master") {
        sh 'docker build -t ${env.JOB_NAME} --no-cache .'
        sh 'docker tag ${env.JOB_NAME} ${env.REGISTRY}/${env.JOB_NAME}'
        sh 'docker push ${env.REGISTRY}/${env.JOB_NAME}'
        sh 'docker rmi -f ${env.JOB_NAME} ${env.REGISTRY}/${env.JOB_NAME}'
      } else {
        print "No Docker image built as branch is ${env.GIT_BRANCH}"
      }
    }

    stage('Test Docker Image') {
      steps {
        sh 'container-structure-test test --image  ${env.REGISTRY}/${env.JOB_NAME} ${env.CONTAINER_TESTS_DIR}/confg.json'
      }
    }
  }
}