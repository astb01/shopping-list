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

    stage('Container Test Setup') {
      steps {
        sh 'curl -LO https://storage.googleapis.com/container-structure-test/latest/container-structure-test-linux-amd64 && chmod +x container-structure-test-linux-amd64 && mkdir -p $HOME/bin && export PATH=$PATH:$HOME/bin && mv container-structure-test-linux-amd64 $HOME/bin/container-structure-test'
        sh 'container-structure-test version'
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }
  }
}