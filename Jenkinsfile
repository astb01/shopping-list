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
        sh 'git --version'
        echo "Branch: ${env.BRANCH_NAME}"

        sh 'docker -v'
        sh 'printenv'
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }
  }
}