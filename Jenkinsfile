pipeline {
  agent any

  tools {
    nodejs "node"
  }

  options {
    buildDiscarder(logRotator(daysToKeepStr: '1', numToKeepStr: '3'))
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

    stage('Build and Test') {
      steps {
        print "Branch: ${env.GIT_BRANCH}"

        sh 'node -v'
        sh 'npm install && npm cache verify'
        sh 'npm test'
      }
    }

    stage('Lint Docker') {
      steps {
        sh "docker pull hadolint/hadolint:latest-debian"
        sh "hadolint --ignore DL4006 Dockerfile"
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build --tag ${env.REGISTRY}:${env.VERSION_NUMBER} --tag ${env.REGISTRY}:latest ."
      }
    }

    stage('Test Docker Image') {
      steps {
        sh "pwd"
        sh "container-structure-test test --image  ${env.REGISTRY}:${env.VERSION_NUMBER} --config ${env.CONTAINER_TESTS_DIR}/config.json"
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "echo ${env.dockerHubPassword} | docker login -u ${env.dockerHubUser} --password-stdin"
          sh "docker push ${env.REGISTRY}:${env.VERSION_NUMBER}"
          sh "docker push ${env.REGISTRY}:latest"
        }
      }
    }

    stage('Clean Up') {
      steps {
        sh 'docker system prune --force'
      }
    }
  }
}